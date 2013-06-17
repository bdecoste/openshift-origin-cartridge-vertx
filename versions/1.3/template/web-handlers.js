/**
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var eb = vertx.eventBus;

var demoHandlers = {
  putRequestOnEventBus: function(address, mockData) {
    return function(request) {

      request.bodyHandler( function(body) {
        eb.publish( address, body.toString() );
      } );
      request.response.statusCode = 200;
      request.response.end();
    };
  },

  proxyRequest: function(request) {
    var proxyRequest = client.get( request.uri, function(proxyResponse) {
      request.response.putHeader( "content-length", proxyResponse.headers()[ "content-length" ] );
      var p = new vertx.Pump(proxyResponse, request.response);
      p.start();
      proxyResponse.endHandler(function() { request.response.end(); });
    }).putHeader( "accept", "application/json" );
    proxyRequest.end();
  },

  serveFile: function(request) {
    filename = "index.html";

    request.response.putHeader( "Cache-Control", "max-age=3600" ).sendFile( filename );
  },

};
