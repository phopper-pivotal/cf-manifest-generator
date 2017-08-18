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
    private boolean noRoute;
    private String healthCheckHttpEndpoint;
    private String healthCheckType;
    private boolean noHostname;
    private boolean randomRoute;
    private String diskQuota;
    private String stack;
    private List<String> services = new ArrayList<String>();
    private List<String> domains = new ArrayList<String>();
    private List<String> hosts = new ArrayList<String>();
    private List<String> routes = new ArrayList<String>();
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

        this.noRoute = "on".equalsIgnoreCase(request.getParameter("noRoute")) ? true : false;

        this.healthCheckHttpEndpoint = request.getParameter("healthCheckHttpEndpoint");

        this.healthCheckType = request.getParameter("healthCheckType");

        this.noHostname = "on".equalsIgnoreCase(request.getParameter("noHostname")) ? true : false;

        this.randomRoute = "on".equalsIgnoreCase(request.getParameter("randomRoute")) ? true : false;

        this.diskQuota = request.getParameter("diskQuota");

        this.stack = request.getParameter("stack");

        if (request.getParameter("services").length() != 0) {
            this.services = Arrays.asList(request.getParameter("services").split(","));
        }

        if (request.getParameter("domains").length() != 0) {
            this.domains = Arrays.asList(request.getParameter("domains").split(","));
        }

        if (request.getParameter("hosts").length() != 0) {
            this.hosts = Arrays.asList(request.getParameter("domains").split(","));
        }

        if (request.getParameter("routes").length() != 0) {
            this.routes = Arrays.asList(request.getParameter("routes").split(","));
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