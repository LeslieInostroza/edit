encabezados = [];
function simulacion() {
  if ($("input[name='optradio']:checked").val() == undefined) {
    alert("Debes seleccionar el tipo de tarea (pickup, delivery o ambas)");
  } else {
    $("#logStatus").val("");
    var convierte = $('#tablaPrincipal').tableToJSON(); // Convert the table into a javascript object
    //console.log(table);
    objJSON = convierte;
    objJSON.forEach(function(filaDatos, indicador) {
      console.log(indicador);
      simulaPideRayo(filaDatos, indicador);
    });
  }
}
function generateTable() {
  var data = $('textarea[name=excel_data]').val()
  //console.log(data);
  var rows = data.split("\n");
  var table = $('<table id=\"tablaPrincipal\" class=\"table table-striped\">');
  // Insert into DOM
  $('#excel_table').html(table);
  table.append("<thead  class=\"thead-dark\" id=\"encabezadoPrincipal\"/>");
  table.append("<tbody id=\"bodyPrincipal\"/>");
  for (var y in rows) {
    if (y == 0) {
      //console.log("es el header");
      encabezados = [];
      var cells = rows[y].split("\t");
      var row = $('<tr />');
      for (var x in cells) {
        encabezados[x] = cells[x];
        row.append('<th>' + cells[x] + '</td>');
        console.log(cells[x]);
      }
      $("#encabezadoPrincipal").append(row);
      // carga selectoresPareo
      for (x in encabezados) {
        $(".selectoresPareo").append("<option value=\"" + encabezados[x] + "\">" + encabezados[x] + "</option>");
      }
      // fin  carga selectoresPareo
    } else {
      //console.log("ROW:"+y);
      //console.log(rows[y]);
      var cells = rows[y].split("\t");
      var row = $('<tr />');
      for (var x in cells) {
        row.append('<td>' + cells[x] + '</td>');
      }
      $("#bodyPrincipal").append(row);
      /*objJSON = convierte;
      objJSON.forEach(function(filaDatos, indicador) {
        console.log(indicador);
        safeCall(filaDatos, indicador);
      }); */
    }
  }
}
exitos = 0;
call = 1;
function safeCall(filaDatos2, indicador2) {
  call++;
  var x = call * 350;
  //alert(x);
  setTimeout(function() {
    // console.log(filaDatos2.Email);
    pideRayo(filaDatos2, indicador2);
  }, x);
}
function pideRayo(parami, indicador3) {
  var request = new XMLHttpRequest();
  request.open('POST', '');
  request.setRequestHeader('Content-Type', 'application/json');
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      $("#logStatus").val($("#logStatus").val() + "Log nº" + (indicador3 + 1) + ":" + this.responseText);
      if (this.status == 200) {
        exitos += 1;
        $("#tareasOk").html(exitos);
      } else {

      }
      //resetea variables
      if (indicador3 == (objJSON.length - 1)) {
        exitos = 0;
        call = 1;
        $("#contenedorDatos").val("");
      }
      // fin resetea variables
    }
  };
  //crea el body del request
  bodyFinalOld = {
    "api_key": $("#selectorCuentas").val(),
    "order_id": parami.orden,
    "job_description": parami.productos,
    "customer_email": parami.email,
    "customer_username": parami.cliente,
    "customer_phone": parami.telefono,
    "customer_address": parami.direccion + "," + parami.comuna,
    //"latitude":"30.7188978",
    //"longitude":"76.810298",
    "job_delivery_datetime": parami.entregamaxima,
    "custom_field_template": $("#selectorPlantillaDelivery").val(),
    "meta_data": [{ "label": "clienterayo", "data": $("#selectorClientes").val() }],
    "team_id": $("#selectorEquipo").val(),
    "auto_assignment": $("#selectorAuto").val(),
    "has_pickup": tienePickup,
    "has_delivery": tieneDelivery,
    "layout_type": "0",
    "tracking_link": 1,
    "timezone":"180",
    //"fleet_id":"636",
    /*"ref_images": ["http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png","http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"], */
    "notify": 1,
    "tags": parami.tags,
    //"geofence":0
  }




                    for (x in correspondenciaPickup) {

                        templatePickup[x].data = parami[correspondenciaPickup[x]];
                        //console.log(x);


                    }
                    for (x in correspondenciaDelivery) {

                        templateDelivery[x].data = parami[correspondenciaDelivery[x]];
                        //console.log(x);


                    }



                    bodyFinal = {
                        "api_key": $("#selectorCuentas").val(),
                        "order_id": parami.orden,
                        "team_id": $("#selectorEquipo").val(),
                        "auto_assignment": $("#selectorAuto").val(),
                        "job_description": parami.descripcion,

                        "job_pickup_phone": parami.telefono_recogida,
                        "job_pickup_name": parami.nombre_recogida,
                        "job_pickup_email": parami.email_recogida,
                        "job_pickup_address": parami.direccionrecogida + "," + parami.comuna_recogida,

                        "job_pickup_datetime": parami.hora_recogida,
                        "customer_email": parami.email,
                        "customer_username": parami.cliente,
                        "customer_phone": parami.telefono,
                        "customer_address": parami.direccion + "," + parami.comuna,

                        "job_delivery_datetime": parami.entregamaxima,

                        "custom_field_template": $("#selectorPlantillaDelivery").val(),
                        "meta_data": templateDelivery,


                        "pickup_custom_field_template": $("#selectorPlantillaPickup").val(),
                        //"pickup_meta_data":[{"label":"clienterayo","data":$("#selectorClientes").val()}],
                        "pickup_meta_data": templatePickup,

                        "has_pickup": tienePickup,
                        "has_delivery": tieneDelivery,
                        "layout_type": "0",
                        "tracking_link": 1,
                        "timezone": "180",
                        "notify": 1,
                        "tags": parami.tags,
                        "geofence": 0
                    }




                    // fin crea body
                    request.send(JSON.stringify(bodyFinal));
                }



                function simulaPideRayo(parami, indicador3) {


                    for (x in correspondenciaPickup) {

                        templatePickup[x].data = parami[correspondenciaPickup[x]];
                        //console.log(x);


                    }
                    for (x in correspondenciaDelivery) {

                        templateDelivery[x].data = parami[correspondenciaDelivery[x]];
                        //console.log(x);


                    }


                    bodyFinal = {
                        "api_key": $("#selectorCuentas").val(),
                        "order_id": parami.orden,
                        "team_id": $("#selectorEquipo").val(),
                        "auto_assignment": $("#selectorAuto").val(),
                        "job_description": parami.descripcion,

                        "job_pickup_phone": parami.telefono_recogida,
                        "job_pickup_name": parami.nombre_recogida,
                        "job_pickup_email": parami.email_recogida,
                        "job_pickup_address": parami.direccionrecogida + "," + parami.comuna_recogida,

                        "job_pickup_datetime": parami.hora_recogida,
                        "customer_email": parami.email,
                        "customer_username": parami.cliente,
                        "customer_phone": parami.telefono,
                        "customer_address": parami.direccion + "," + parami.comuna,

                        "job_delivery_datetime": parami.entregamaxima,

                        "custom_field_template": $("#selectorPlantillaDelivery").val(),
                        "meta_data": templateDelivery,


                        "pickup_custom_field_template": $("#selectorPlantillaPickup").val(),
                        //"pickup_meta_data":[{"label":"clienterayo","data":$("#selectorClientes").val()}],
                        "pickup_meta_data": templatePickup,

                        "has_pickup": tienePickup,
                        "has_delivery": tieneDelivery,
                        "layout_type": "0",
                        "tracking_link": 1,
                        "timezone": "180",
                        "notify": 1,
                        "tags": parami.tags,
                        "geofence": 0
                    }


                    $("#modalBodyOk").html(JSON.stringify(bodyFinal, undefined, 2));
                    $('#exampleModalLong').modal('show');


                    // fin crea body
                }





                $('#toJSON').click(function() {
                        $("#logStatus").val("");
                        var convierte = $('#tablaPrincipal').tableToJSON(); // Convert the table into a javascript object
                        //console.log(table);
                        objJSON = convierte;

                        objJSON.forEach(function(filaDatos, indicador) {
                            console.log(indicador);
                            safeCall(filaDatos, indicador);
                        });


                });

                $('#botonSimulacion').click(function() {

                    simulacion();


                });


                $('#botonGeneraTabla').click(function() {

                    generateTable();


                });
              