$(document).ready(function () {
    var services = [];
    var domains = [];
    var hosts = [];
    var routes = [];
    var envVars = {};
    var buildpacks = ['https://github.com/cloudfoundry/java-buildpack', 'https://github.com/cloudfoundry/cf-buildpack-ruby',
        'https://github.com/cloudfoundry/heroku-buildpack-nodejs', 'https://github.com/cloudfoundry/ibm-websphere-liberty-buildpack',
        'https://github.com/jmcc0nn3ll/jetty-buildpack', 'https://github.com/dmikusa-pivotal/cf-php-build-pack',
        'https://github.com/mstine/heroku-buildpack-clojure', 'https://github.com/BrianMMcClain/heroku-buildpack-haskell',
        'https://github.com/michaljemala/cloudfoundry-buildpack-go', 'https://github.com/hmalphettes/heroku-buildpack-go',
        'https://github.com/cloudfoundry-community/nginx-buildpack', 'https://github.com/cloudfoundry-community/.net-buildpack',
        'https://github.com/ephoning/heroku-buildpack-python', 'https://github.com/joshuamckenty/heroku-buildpack-python',
        'https://github.com/friism/heroku-buildpack-mono', 'https://github.com/davidl-zend/zend-server-mysql-buildpack-dev',
        'https://github.com/tsl0922/java-buildpack', 'https://github.com/glyn/virgo-buildpack', 'https://github.com/heroku/heroku-buildpack-php',
        'https://github.com/iphoting/heroku-buildpack-php-tyler', 'https://github.com/heroku/heroku-buildpack-scala'];

    function htmlEncode(value) {
        //create a in-memory div, set it's inner text(which jQuery automatically encodes)
        //then grab the encoded contents back out.  The div never exists on the page.
        return $('<div/>').text(value).html();
    };

    function createTag(name, closeFunc) {
        var close = $('<a><i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>');
        var tag = $('<span class="tag label label-info"><span>' + name + '</span></span>').append(close);
        close.click(function (e) {
            tag.remove();
            closeFunc(e);
        });
        return tag;
    };

    function numericValidator(alertId) {
        return function (e) {
            if (!$.isNumeric($(this).val()) && $(this).val() !== '') {
                $(alertId).show();
                $(this).parents('.form-group').addClass('has-error');
                $('#generateBtn').attr('disabled', 'disabled');
            } else {
                $(alertId).hide();
                $(this).parents('.form-group').removeClass('has-error');
                $('#generateBtn').removeAttr('disabled');
            }
        }
    };

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({value: str});
                }
            });

            cb(matches);
        };
    };

    $('#inputServiceName').keyup(function (e) {
        if ($(this).val() !== '') {
            $('#serviceAddBtn').removeAttr('disabled');
        } else {
            $('#serviceAddBtn').attr('disabled', 'disabled');
        }
    });

    $('#inputDomains').keyup(function (e) {
        if ($(this).val() !== '') {
            $('#domainsAddBtn').removeAttr('disabled');
        } else {
            $('#domainsAddBtn').attr('disabled', 'disabled');
        }
    });

    $('#inputHosts').keyup(function (e) {
        if ($(this).val() !== '') {
            $('#hostsAddBtn').removeAttr('disabled');
        } else {
            $('#hostsAddBtn').attr('disabled', 'disabled');
        }
    });

    $('#inputRoutes').keyup(function (e) {
        if ($(this).val() !== '') {
            $('#routesAddBtn').removeAttr('disabled');
        } else {
            $('#routesAddBtn').attr('disabled', 'disabled');
        }
    });


    function envKeyUp(e) {
        if ($('#inputEnvName').val() !== '' && $('#inputEnvValue').val() !== '') {
            $('#envAddBtn').removeAttr('disabled');
        } else {
            $('#envAddBtn').attr('disabled', 'disabled');
        }
    };

    $('#inputAppName').keyup(function (e) {
        if ($(this).val() !== '') {
            $('#generateBtn').removeAttr('disabled');
            $('#downloadBtn').removeAttr('disabled');
        } else {
            $('#generateBtn').attr('disabled', 'disabled');
            $('#downloadBtn').attr('disabled', 'disabled');
        }
    });

    $('#inputMemory').keyup(numericValidator('#memoryAlert'));
    $('#inputInstances').keyup(numericValidator('#instancesAlert'));
    $('#inputTimeout').keyup(numericValidator('#timeoutAlert'));

    $('#inputEnvName').keyup(envKeyUp);
    $('#inputEnvValue').keyup(envKeyUp);

    $('#serviceAddBtn').click(function () {
        var serviceName = htmlEncode($('#inputServiceName').val());
        $('#inputServiceName').val('');
        $('#serviceAddBtn').attr('disabled', 'disabled');
        var index = services.push(serviceName) - 1;
        var tag = createTag(serviceName, function (e) {
            services.splice(index, 1);
            if (services.length == 0) {
                $('#servicesFormGroup').hide();
            }
        });
        $('#services').append(tag);
        $('#servicesFormGroup').show();
        return false;
    });

    $('#domainsAddBtn').click(function () {
        var domainName = htmlEncode($('#inputDomains').val());
        $('#inputDomains').val('');
        $('#domainsAddBtn').attr('disabled', 'disabled');
        var index = domains.push(domainName) - 1;
        var tag = createTag(domainName, function (e) {
            domains.splice(index, 1);
            if (domains.length == 0) {
                $('#domainsFormGroup').hide();
            }
        });
        $('#domains').append(tag);
        $('#domainsFormGroup').show();
        return false;
    });

    $('#hostsAddBtn').click(function () {
        var hostName = htmlEncode($('#inputHosts').val());
        $('#inputHosts').val('');
        $('#hostsAddBtn').attr('disabled', 'disabled');
        var index = hosts.push(hostName) - 1;
        var tag = createTag(hostName, function (e) {
            hosts.splice(index, 1);
            if (hosts.length == 0) {
                $('#hostsFormGroup').hide();
            }
        });
        $('#hosts').append(tag);
        $('#hostsFormGroup').show();
        return false;
    });

    $('#routesAddBtn').click(function () {
        var routeName = htmlEncode($('#inputRoutes').val());
        $('#inputRoutes').val('');
        $('#routesAddBtn').attr('disabled', 'disabled');
        var index = routes.push(routeName) - 1;
        var tag = createTag(routeName, function (e) {
            routes.splice(index, 1);
            if (routes.length == 0) {
                $('#routesFormGroup').hide();
            }
        });
        $('#routes').append(tag);
        $('#routesFormGroup').show();
        return false;
    });

    $('#envAddBtn').click(function () {
        var envName = htmlEncode($('#inputEnvName').val());
        var envValue = htmlEncode($('#inputEnvValue').val());
        $('#inputEnvName').val('');
        $('#inputEnvValue').val('');
        $('#envAddBtn').attr('disabled', 'disabled');
        envVars[envName] = envValue;
        var tag = createTag(envName + ': ' + envValue, function (e) {
            delete envVars[envName];
            if (Object.keys(envVars).length == 0) {
                $('#envVarFormGroup').hide();
            }
        });
        $('#envVars').append(tag);
        $('#envVarFormGroup').show();
        return false;
    });

    $('#generateBtn').click(function () {
        $.ajax({
            type: "POST",
            url: "/generate",
            data: JSON.stringify({
                "appName": $('#inputAppName').val().trim(),
                "memory": $('#inputMemory').val(),
                "instances": $('#inputInstances').val().trim(),
                "buildpack": $('#inputBuildpack').val().trim(),
                "host": $('#appAsHost').is(':checked') ? $('#inputAppName').val().trim() : $('#inputHost').val().trim(),
                "domain": $('#inputDomain').val().trim(),
                "path": $('#inputPath').val().trim(),
                "timeout": $('#inputTimeout').val().trim(),
                "command": $('#inputCommand').val().trim(),
                "noRoute": $('#noRoute').is(':checked'),
                "healthCheckHttpEndpoint": $('#inputHealthCheckHttpEndpoint').val().trim(),
                "healthCheckType": $('#inputhealthCheckType').val().trim(),
                "noHostname": $('#noHostname').is(':checked'),
                "randomRoute": $('#randomRoute').is(':checked'),
                "stack": $('#inputStack').val(),
                "services": services,
                "domains": domains,
                "hosts": hosts,
                "routes": routes,
                "envVars": envVars
            }),
            contentType: "application/json"
        }).done(function (data) {
            $('#yaml').text(data);
            $('#yamlContainer').show();
        });
        return false;
    });

    $('#downloadBtn').click(function () {
        $('#inputServicesFinal').val(services.join());
        $('#inputDomainsFinal').val(domains.join());
        $('#inputHostsFinal').val(hosts.join());
        $('#inputRoutesFinal').val(routes.join());
        $('#inputEnvValFinal').val(JSON.stringify(envVars));
    })

    $('#appAsHost').change(function () {
        if ($(this).is(':checked')) {
            $('#hostFormGroup').hide();
        } else {
            $('#hostFormGroup').show();
        }
    });

    if ($('#appAsHost').is(':checked')) {
        $('#hostFormGroup').hide();
    } else {
        $('#hostFormGroup').show();
    }

    $('#inputBuildpack').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'buildpacks',
            displayKey: 'value',
            source: substringMatcher(buildpacks)
        });

    $('#inputAppName').popover({});
    $('#inputMemory').popover({});
    $('#inputInstances').popover({});
    $('#inputBuildpack').popover({});
    $('#inputHost').popover({});
    $('#inputDomain').popover({});
    $('#inputPath').popover({});
    $('#inputTimeout').popover({});
    $('#inputCommand').popover({});
    $('#inputHealthCheckHttpEndpoint').popover({});
    $('#inputHealthCheckType').popover({});
    $('#noHostname').popover({});
    $('#randomRoute').popover({});
    $('#inputDiskQuota').popover({});
    $('#inputStack').popover({});
    $('#inputCommand').popover({});
    $('#inputServiceName').popover({});
    $('#inputEnvValue').popover({});
    $('#route').popover({});
    $('#appAsHost').popover({});
});