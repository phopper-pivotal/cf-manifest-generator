package io.pivotal.controller;

import io.pivotal.Manifest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class ManifestController {

  @RequestMapping(value="/generate", method=RequestMethod.POST)
  public String generator(@RequestBody Manifest manifest, HttpServletResponse  response) {
    return manifest.toString();
  }
  
  @RequestMapping(value="/download", method=RequestMethod.POST)
  public void download(HttpServletRequest request, HttpServletResponse  response) throws IOException {
    Manifest manifest = new Manifest(request);
    response.setHeader( "Content-Disposition", "attachment; filename=manifest.yml");
    response.setContentType("text/plain");
    response.getWriter().write(manifest.toString());
  }
}