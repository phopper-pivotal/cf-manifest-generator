package io.pivotal;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
public class Manifest {
    private static final Logger LOG = Logger.getLogger(Manifest.class.getName());
    private String appName;
    private int memory;
    private int instances = 1;
    private String buildpack;
    private String host;
    private String domain;
    private String path;
    private int timeout = 60;
    private String command;
    private String healthCheckHttpEndpoint;
    private String healthCheckType;
    private boolean noHostname;
    private boolean noRoute;
    private boolean randomRoute;
    private String stack;
    private List<String> services = new ArrayList<String>();
    private Map<String, String> envVars = new HashMap<String, String>();

    public Manifest(HttpServletRequest request) {
        this.appName = request.getParameter("appName");
        this.memory = Integer.parseInt(StringUtils.defaultIfBlank(request.getParameter("memory"), "128"));
        this.instances = Integer.parseInt(StringUtils.defaultIfBlank(request.getParameter("instances"), "1"));
        this.buildpack = request.getParameter("buildpack");
        this.host = request.getParameter("host");
        this.domain = request.getParameter("domain");
        this.path = request.getParameter("path");
        this.timeout = Integer.parseInt(StringUtils.defaultIfBlank(request.getParameter("timeout"), "60"));
        this.command = request.getParameter("command");
        this.noRoute = "on".equalsIgnoreCase(request.getParameter("route")) ? true : false;
        String servicesStr = request.getParameter("services");
        if (servicesStr.length() != 0) {
            this.services = Arrays.asList(request.getParameter("services").split(","));
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            TypeReference<HashMap<String, String>> typeRef = new TypeReference<HashMap<String, String>>() {
            };
            this.envVars = mapper.readValue(request.getParameter("envVars"), typeRef);
        } catch (Exception e) {
            LOG.warn("Error parsing JSON object for environment variables", e);
        }
    }
}