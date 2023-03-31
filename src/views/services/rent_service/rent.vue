<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Contrato de Renta" is_reload @reload="doCreate"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <section>
            <label semi-bold class="client-data">Datos del Cliente/Arrendatario</label>
            <b-field label="Cliente" label-position="on-border">
              <b-select placeholder="Clinete"
                        v-model="rentObject.fk_client"
                        expanded>
                <option v-for="(item, index) of clientList" :key="index"
                        :value="item.id">
                  {{ item.client_name }}
                </option>
              </b-select>
            </b-field>
          </section>
          <section>
            <label semi-bold class="client-data">Objeto del Contrato</label>
          </section>

          <div class="columns mt-1">
            <div class="column is-half">
              <div class="columns">
                <div class="column">
                  <b-field label="Estación de Renta" label-position="on-border">
                    <b-select placeholder="Estación de Renta"
                              v-model="rentObject.rental_station"
                              expanded>
                      <option v-for="(item, index) of workStationList" :key="index"
                              :value="item.id">
                        {{ item.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Estación de Recogida" label-position="on-border">
                    <b-select placeholder="Estación de Recogida"
                              v-model="rentObject.delivery_station"
                              expanded>
                      <option v-for="(item, index) of workStationList" :key="index"
                              :value="item.id">
                        {{ item.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <b-field label="Bicicletas" label-position="on-border">
                <multiselect
                    placeholder="Bicicletas"
                    v-model="rentObject.bikes"
                    :multiple="true"
                    track-by="id"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="bicycle_stock_list">
                </multiselect>
              </b-field>

              <div class="columns">
                <div class="column">
                  <b-field label="Cantidad de Bicicletas" label-position="on-border">
                    <b-input placeholder="Cantidad de bicicleta(s)"
                             v-model="rentObject.qty_bicycles"
                             required
                             validation-message="Campo requerido"
                             type="number">
                    </b-input>
                  </b-field>
                  <b-field label="Fecha Inicio" label-position="on-border">
                    <b-datepicker
                        v-model="rentObject.start_date"
                        :show-week-number="false"
                        placeholder="Fecha Inicio"
                        trap-focus
                    >
                    </b-datepicker>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="Pago de Arredamiento" label-position="on-border">
                    <b-input placeholder="Pago de arrendamiento"
                             v-model="rentObject.payment_lease"
                             required
                             validation-message="Campo requerido"
                             type="text">
                    </b-input>
                  </b-field>
                  <b-field label="Fecha Entrega" label-position="on-border">
                    <b-datepicker
                        v-model="rentObject.deliver_date"
                        :show-week-number="false"
                        placeholder="Fecha Entrega"
                        trap-focus
                    >
                    </b-datepicker>
                  </b-field>

                </div>
              </div>

            </div>
            <div class="column is-half">
              <b-field label="Cuenta de Ingreso" label-position="on-border">
                <b-select placeholder="Cuenta de Ingreso"
                          v-model="rentObject.type_income"
                          expanded>
                  <option
                      v-for="item in list_type_income.results"
                      :key="item.id"
                      :value="item.id">
                    {{ item.name }}
                  </option>
                </b-select>
              </b-field>
              <div class="is-flex is-justify-content-space-between mb-5">
                <b-checkbox v-model="rentObject.helmet">Casco</b-checkbox>
                <b-field v-if="rentObject.helmet" label="Cantidad" label-position="on-border">
                  <b-input placeholder="Cantidad de cascos"
                           v-model="rentObject.quantity_helmets"
                           :required="rentObject.helmet"
                           validation-message="Campo requerido"
                           type="number">
                  </b-input>
                </b-field>
                <b-field v-if="rentObject.helmet" label="Precio" label-position="on-border">
                  <b-input placeholder="Precio"
                           v-model="rentObject.price_helmets"
                           :required="rentObject.helmet"
                           validation-message="Campo requerido"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <div class="is-flex is-justify-content-space-between mb-5">
                <b-checkbox v-model="rentObject.padlock">Candado</b-checkbox>
                <b-field v-if="rentObject.padlock" label="Cantidad" label-position="on-border">
                  <b-input placeholder="Cantidad de candados"
                           v-model="rentObject.quantity_padlocks"
                           :required="rentObject.padlock"
                           validation-message="Campo requerido"
                           type="number">
                  </b-input>
                </b-field>
                <b-field v-if="rentObject.padlock" label="Precio" label-position="on-border">
                  <b-input placeholder="Precio"
                           v-model="rentObject.price_padlock"
                           :required="rentObject.padlock"
                           validation-message="Campo requerido"
                           type="number">
                  </b-input>
                </b-field>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <b-field label="Hora de Inicio" label-position="on-border">
                    <vue-timepicker v-model="rentObject.start_time" :minute-interval="5"
                                    format="hh:mm A"></vue-timepicker>
                  </b-field>
                </div>
                <div class="column is-half">
                  <b-field label="Hora de Entrega" label-position="on-border">
                    <vue-timepicker v-model="rentObject.time_delivery" :minute-interval="5"
                                    format="hh:mm A"></vue-timepicker>
                  </b-field>
                </div>

              </div>


            </div>
          </div>

          <div class="columns">
            <div class="column is-7 is-flex is-flex-direction-column">
              <b-field>
                <b-upload v-model="dropFiles"
                          multiple
                          accept="image/*"
                          drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon
                            icon="upload"
                            size="is-large">
                        </b-icon>
                      </p>
                      <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
              <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary">
                {{ file.name }}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                </button>
            </span>
              </div>
            </div>
            <div class="column is-5" v-if="attaches.length">
              <div class="columns is-flex is-flex-direction-column">
                <div class="column is-3">
                  <b-button class="btn-new btn-global btn-clean"
                            @click="attach=!attach">
                    <span lg-font regular>Ver Adjuntos</span>
                  </b-button>

                </div>
                <div class="column is-9" v-if="attach">
                  <b-carousel
                      :autoplay="false"
                      with-carousel-list
                      :indicator="false"
                      :overlay="gallery"
                  >
                    <b-carousel-item v-for="(item, i) in attaches" :key="i">
                      <figure @click="showImg(item)" class="image">
                        <img :src="item" alt="">
                      </figure>
                    </b-carousel-item>
                    <span v-if="gallery" class="modal-close is-large"></span>
                    <template slot="list" slot-scope="props">
                      <b-carousel-list
                          v-model="props.active"
                          :data="attaches"
                          v-bind="al"
                          @switch="props.switch($event, false)"
                          as-indicator
                      ></b-carousel-list>
                    </template>

                  </b-carousel>
                  <b-modal v-model="isImageModalActive" :width="640" scroll="keep">
                    <p class="image is-4by3">
                      <img alt="" :src="imgModal">
                    </p>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>


          <div class="buttons is-flex is-justify-content-center">
            <b-button @click="generateContract" class="btn-global btn-accept is-rounded form mt-3"><span
                lg-font regular main-color>Guardar</span>
            </b-button>
          </div>
        </section>
      </div>
    </section>
    <b-modal
        v-model="firmContract"
    >
      <template #default="props">
        <digital-firm @close="props.close" @completed="generateReport"/>
      </template>
    </b-modal>

    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :manual-pagination="false"
        :pdf-quality="2"
        pdf-format="a3"
        filename="Contrato de Renta Ha Bici"
        pdf-content-width="1000"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"

    >
<!--      :html-to-pdf-options="optionsPdf"-->

      <section class="report-pdf" slot="pdf-content" v-if="rentObject">
        <div class="pdf-item">
          <section class="is-flex is-align-items-center is-justify-content-center title">
            CONTRATO ARRENDAMIENTO SISTEMA DE BICICLETAS PÚBLICAS DE LA HABANA
          </section>
          <section>
            <div>
              DATOS DEL ARRENDADOR (OPERADOR):
            </div>
            <table class="border table" style="margin-bottom: 0 !important;">
              <tr>
                <td class="w-50">
                  <div>
                    <b> EMPRESA:</b> Vélo Cuba http://www.veloencuba.com/
                  </div>
                  <div>
                    <b>e-mail:</b> customerservice@veloencuba.com
                  </div>
                  <div>
                    <b>TITULAR:</b> NAYVIS DIAZ LABAUT, C.I.: 76043005374, NIT: 9350-4706-7034-2032
                  </div>
                  <div>
                    <b>LICENCIA DE OPERACIÓN DE TRANSPORTE:</b> HNB018146
                  </div>
                </td>
                <td class="w-50">
                  <div>
                    <b>ASESOR LEGAL, OFICINA DEL HISTORIADOR DE LA</b>
                  </div>
                  <div>
                    <b> HABANA:</b> EMPRESA GESTIÓN DEL PATRIMONIO
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between">
            <span>
              <b>SERVICIOS TÉCNICOS:</b> +53 52825148, +53 78620896
            </span>
                    <span>
                <b>HORARIOS DE ATENCIÓN:</b> De lunes a sábado de 9:00hrs a 17:00hrs (Última Renta hasta las 16:30hrs)
            </span>
                  </div>
                </td>
              </tr>

            </table>
            <table class="table border">
              <tr>
                <td>
                  <div class="is-flex is-flex-direction-column">
              <span>
               <b>Estaci&oacute;n de Renta:</b>
              </span>
                    <span v-if="station_start_pdf">
               {{station_start_pdf.nombre}}:
              </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span v-if="station_start_pdf">{{station_start_pdf.direccion}}</span>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             <b>Estaci&oacute;n de Entrega:</b>
            </span>
                    <span v-if="station_end_pdf">
             {{station_end_pdf.nombre}}:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span v-if="station_end_pdf">{{station_end_pdf.direccion}}</span>
            </span>
                  </div>
                </td>
              </tr>
            </table>

            <div>
              DATOS DEL ARRENDATARIO (CLIENTE y/o REPRESENTANTE LEGAL PARA RENTA DE EMPRESAS O AGENCIAS):
            </div>
            <table class="table border">
              <tr>
                <td class="w-50"><b>1. NOMBRES Y APELLIDOS O DE LA EMPRESA:</b> {{ rentObject.name }}
                  {{ rentObject.last_name }}
                </td>
                <td class="w-50"><b>DOMICILIO TEMPORAL, PERMANENTE EN CUBA O DE LA ENTIDAD QUE REPRESENTA:</b>
                  {{ rentObject.address }}
                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span><b>C.I:/ D.N.I:/ PASAPORTE/</b> {{ rentObject.dni }}</span>
                    <span> <b>Código REU:</b></span>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span> <b>TELÉFONOS:</b> {{ rentObject.phone }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span> <b>NACIONALIDAD:</b> {{ rentObject.nationality }}</span>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span> <b>E-Mail:</b> {{ rentObject.email }}</span>
                  </div>
                </td>
              </tr>
            </table>

            <div>
              OBJETO DEL CONTRATO:
            </div>
            <table class="table border">
              <tr>
                <td class="w-50"><b>CANTIDAD DE BICICLETA(S):</b> {{ quantity_bike }}</td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <b>MODELO(S):</b>
                    <div v-for="(item, idx) in bicycleFull" :key="idx">
                      Numero:{{ item.numero }}-Modelo:{{ item.modelo }}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">

                  <div class="is-flex is-justify-content-space-between">
                    <div class="is-flex is-flex-direction-column">
                      <div>
                        <span> <b>VALOR DE LA BICICLETA(S):</b> </span>
                      </div>
                      <div v-for="(item, idx) in bicycleFull" :key="idx">
                        {{ item.nombre }}-->:{{ item.precio_compra }}
                      </div>
                    </div>
                    <div>
                      <b> <b>Total:</b> <span class="ml-3">{{ totalPriceBike }}</span> </b>
                    </div>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-justify-content-space-between">
                    <div class="is-flex is-flex-direction-column">
                      <span><b>ACCESORIOS:</b></span>
                      <span> Cascos: {{ rentObject.quantity_helmet }} </span>
                      <span>Candado y Llave:{{ rentObject.quantity_padlock }} </span>
                    </div>
                    <div class="is-flex is-flex-direction-column">
                      <span> <b>Valores</b> </span>
                      <span> {{ rentObject.price_helmet }} </span>
                      <span>{{ rentObject.price_padlock }} </span>
                    </div>
                  </div>

                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="columns">
                    <div class="column is-half is-flex is-flex-direction-column">
                     <span class="is-flex is-align-items-center is-justify-content-space-between">
                      <span> <b>Tipo de Cliente:</b> </span> <span>{{ rentObject.client_type }}</span>
                    </span>
                    </div>
                  </div>
                </td>
                <td class="w-50">
                  <div>
                    <b>PAGO DE ARRENDAMIENTO:</b> {{ rentObject.pay_rent }}
                  </div>
                  <div class="columns">
                    <div class="column is-5">
                      <b>CUENTAS DE EMPRESA:</b>
                    </div>
                    <div class="column is-7">
                      <div>
                        <b>Tarjeta CUC:</b> 9213 9598 7013 8956
                      </div>
                      <div>
                        <b>Tarjeta CUP:</b> 9212 9598 7019 3358
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">
          <span class="is-flex is-align-items-center">
           <span> <b>HORA DE RECOGIDA: </b></span>
            <span class="ml-3">{{ formatAMPM(rentObject.hour_ini) }}</span>
          </span>
                </td>
                <td class="w-50">
             <span class="is-flex is-align-items-center">
               <span><b>HORA DE ENTREGA: </b></span>
               <span class="ml-3">{{ formatAMPM(rentObject.hour_ent) }}</span>
          </span>
                </td>
              </tr>

            </table>
          </section>
        </div>
        <section class="pdf-item px-5">
          <div class="mt-2">
            <b> TÉRMINOS Y CONDICIONES GENERALES DEL CONTRATO</b>
          </div>
          <div>
            <ol>
              <li><b>Las bicicletas y accesorios se recogerán y/o entregarán en los horarios establecidos</b> en las
                Estaciones o sitio para la renta.
              </li>
              <li>
                <b>El ARRENDATARIO podrá prorrogar</b> la duración del presente contrato mediante comunicación
                previa con el ARRENDADOR.
                <br>
                <b>Si incumple la hora de entrega ocasionará un coste adicional de 80 CUP para clientes habituales y
                  120 CUP para clientes ocasionales.</b></li>
              <li>
                La bicicleta y/o materiales se devolverán completos e igual estado en el que se entregó por parte
                del ARRENDADOR. En caso de
                deterioros el ARRENDATARIO tiene la obligación de informarlo y pagar los gastos para su reposición
                y/o reparación
              </li>
              <li><b>En caso de robo</b> durante el periodo de alquiler, <b>el ARRENDATARIO</b> debe informar al
                ARRENDADOR y <b>asumirá de manera inmediata el
                  pago del 100% del importe informado por el ARRENDADOR</b> , el precio del mercado nacional,
                informado en este contrato.
              </li>
              <li><b>El ARRENDATARIO está obligado a fijar correctamente el candado, dejar la bicicleta en un ángulo
                de visión </b>que le permita supervisar
                su parqueo eventualmente (pasar el candado por el cuadro, sillín y ruedas y atar la bicicleta aun
                poste fijado al suelo).
              </li>
              <li>El ARRENDATARIO declara estar en perfectas condiciones de salud para manejar una bicicleta y
                controlar el equipamiento alquilado.
              </li>
              <li>El ARRENDATARIO debe estar asegurado con cobertura contra los riesgos que se puedan presentar
                durante el periodo de alquiler.
              </li>
              <li><b>El ARRENDADOR no se hace responsable, por mala manipulación del ARRENDATARIO</b> , de
                reclamaciones por accidentes, heridas,
                golpes o daños ocasionados a sí mismo o a bienes de su propiedad, o por perdida de objetos durante
                el periodo de alquiler. De
                igual forma el ARRENDADOR no asume los daños ocasionados a terceros, personas o bienes por parte del
                ARRENDATARIO en el
                uso inadecuado de la bicicleta.
              </li>
              <li><b>Es responsabilidad del ARRENDATARIO respetar la Ley 109 del Código de Seguridad Vial de la
                República de Cuba.</b></li>
              <li><b>El ARRENDADOR es responsable de la custodia de los datos personales del ARRENDATARIO </b>y uso
                exclusivo para garantizar
                la legalidad del servicio contratado: documentos entregados en garantía, depósitos, fotos
                personales, entre otros.
              </li>
              <li><b>El ARRENDADOR podrá rescindir unilateralmente el contrato antes de la fecha de su conclusión en
                caso de incumplimiento</b>
                grave por parte del ARRENDATARIO en el uso y cuidado de la bicicleta. En este caso el ARRENDADOR
                podrá tomar posesión
                inmediata de la bicicleta en el lugar en que se encuentre, sin que tenga derecho el ARRENDATARIO a
                ningún tipo de reclamación
                o indemnización.
              </li>
              <li>Este contrato se firma por duplicado, quedando una copia en poder del servicio de alquiler como
                garantía de la veracidad de sus datos.
              </li>
              <li><b>Es de condición obligatoria que el ARRENDATARIO posea un teléfono móvil </b>para la renta de la
                bicicleta y así garantizar la comunicación
                constante durante su servicio con el ARRENDADOR y viceversa.
              </li>
            </ol>
          </div>
        </section>
        <!--    break page   -->
          <div class="pdf-item html2pdf__page-break px-5">
            <div class="mt-2">
              <b> REFERENTE A LOS SERVICIOS A CLIENTES HABITUALES:</b>
            </div>
            <div>
              <ol>
                <li>
                  <b> El ARRENDATARIO debe pagar antes o al cumplimiento del término contratado su prórroga</b> con el
                  objetivo
                  de continuar la
                  suscripción contratada (semanal, mensual, trimestral, semestral o anual)
                </li>
                <li>
                  <b>Una vez transcurrido un periodo superior a 15 días de vencida la suscripción, se cancela de forma
                    automática.</b>
                </li>
                <li>
                  <b>Ante una avería, rotura, accidente o cualquier incidencia el ARRENDATARIO debe dejar de
                    circular</b> con la
                  bicicleta de inmediato y
                  comunicarlo. De inmediato el <b>ARRENDADOR garantiza asistencia técnica en el lugar del incidente</b>
                  y en
                  caso necesario, cambio
                  del medio, siempre y <b>cuando se encuentre en los horarios de 9hrs-17hrs</b>. Pasado este horario el
                  ARRENDADOR informará como
                  proceder.
                </li>
              </ol>
            </div>
            <div class="mt-6">
              <b>RESPECTO A LAS BICICLETAS:</b>
            </div>
            <div>
              <ol>
                <li>
                  <b>El ARRENDATARIO no podrá ceder, vender, hipotecar, permutar o pignorar la bicicleta o sus
                    herramientas y
                    elementos</b>. En ningún
                  caso utilizará la bicicleta de modo que pugne con el derecho de propiedad del ARRENDADOR.
                </li>
                <li>
                  <b>Queda prohibido realizar cualquier tipo de modificación en la bicicleta sin el consentimiento del
                    ARRENDADOR</b>. Igualmente
                  queda prohibido:
                  <div class="is-flex is-flex-direction-column">
           <span>
             - Meter la bicicleta en la arena de la playa ya que el daño que puede sufrir podría ser irreparable.
           </span>
                    <span>
             - Que utilicen la bicicleta y equipos de alquiler personas que no se encuentren designadas como usuarios en el contrato de alquiler.
           </span>
                    <span>
             - Que se utilice la bicicleta para carreras, juegos, pruebas de saltos y otros usos similares.
           </span>
                    <span>
             - Que se utilice la bicicleta para cometer delito de robo, tráfico, transportación o similar, considerado ilegal
           </span>
                    <span>
             - Trasladar en la bicicleta materias explosivas o inflamables, drogas o estupefacientes, aún en el caso de que dicho transporte fuera
               hecho dentro de las normas legales.
           </span>

                  </div>
                </li>
                <li>
                  <b>El ARRENDATARIO será responsable del buen cuidado de la llave, candado, casco, parrillas,
                    portaobjetos, kit de herramientas
                    u otros materiales entregados</b>. En caso de pérdida, el ARRENDATARIO responderá con el coste
                  estimado de dichos materiales.
                </li>
                <li>
                  <b>En caso de pérdida o robo de la bicicleta, el ARRENDADOR debiendo comunicar de inmediato tal
                    circunstancia, procederá a
                    indemnizar al arrendatario con la cantidad acordada entre ambos y fijada por escrito en el presente
                    contrato .</b>
                </li>
              </ol>
            </div>
            <div class="mt-2">
              <b>REFERENTE A RENTAS EN GRUPOS O EVENTOS:</b>
            </div>
            <div>
              <ol>
                <li>
                  El ARRENDATARIO se hace responsable del uso correcto de los medios por cada uno de los clientes que
                  representa en el presente
                  contrato.
                </li>
                <li>
                  El ARRENDADOR pone a disposición de cada grupo o evento donde se utilicen los medios de la empresa la
                  cantidad de personal
                  para asistencia técnica siguiente:
                  <div class="is-flex is-flex-direction-column">
           <span>
             - Grupos de 5-15 clientes: 2 Técnicos
           </span>
                    <span>
             - Grupos de 16-30 clientes: 3 Técnicos
           </span>
                    <span>
             - Grupos de 31-50 clientes: 5 Técnicos
           </span>
                    <span>
             - Grupos mayores de 51 clientes: 10 Técnicos
           </span>
                  </div>
                </li>
              </ol>
            </div>
            <div class="mt-2">
              <b>RESPECTO AL PRECIO DEL ARRENDAMIENTO:</b>
            </div>
            <div>
              <ol>
                <li>
                  <b>El ARRENDATARIO se compromete expresamente a pagar por adelantado el precio de la renta de la
                    bicicleta</b> y/o accesorios, en
                  caso de pagos de transacciones bancarias (transferencias, cheques u otros) en un plazo no mayor a 30
                  días posterior a la fecha
                  del servicio.
                </li>
                <li>
                  Igualmente serán a cuenta del ARRENDATARIO:
                  <div class="is-flex is-flex-direction-column">
           <span>
             - El importe o diferencia de valor de herramienta u otro que falte a la bicicleta o haya sido sustituida.
           </span>
                    <span>
             - Los gastos que se originen al ARRENDADOR por transporte y paralización del servicio.
           </span>
                    <span>
             - El importe de todo tipo de multas, gastos judiciales y extrajudiciales derivados de cualquier tipo de sanción, incluidos los de transportación
               para retirar la bicicleta, por hechos ocurridos durante la vigencia del contrato.
           </span>
                  </div>
                </li>
                <li>
                  <b>
                    El pago del servicio de renta no incluye seguro de daños materiales o personales que pueda sufrir EL
                    ARRENDATARIO en si mismo
                    u ocasionar a terceros.
                  </b>
                </li>
              </ol>
            </div>
            <div class="mt-2">
              <b>CLAÚSULAS FINALES:</b>
            </div>
            <p>
              La ONAT como organismo rector tributario para la actividad de cuenta propia en Cuba es competente para
              resolver cualquier
              controversia que se suscite sobre la interpretación o cumplimiento del presente contrato. Sin perjuicio de
              lo anterior, las partes se
              someten a la jurisdicción de los tribunales competentes en La Habana, Cuba, renunciando a cualquier otra
              jurisdicción que
              pudiera corresponderles por razón de sus domicilios presentes o futuros u otra razón. <br>
              Leído por las partes el presente contrato, conocido su alcance legal, se firma por duplicado en La Habana,
              el día <b>{{ new Date().getDay() }} / {{ new Date().getMonth() }} del {{ new Date().getFullYear() }}</b> .
              La Directora General de Vélo Cuba, Nayvis Díaz Labaut, ciudadana cubana, con domicilio legal en Calle K
              No. 357 entre 19 y 21, de no
              estar presente, designa a un trabajador contratado que ante los efectos del presente contrato actuará como
              representante legal y
              ARRENDADOR.
            </p>
            <div>
              <b>ARRENDADOR:</b>
            </div>
            <table class="table border">
              <tr>
                <td class="w-50">
                  <div>
                    <span>ARRENDADOR:</span>
                  </div>
                  <div>
                    Nayvis Díaz Labaut
                  </div>
                </td>
                <td class="w-50">
                  <div>
                    <span>FIRMA:</span>
                  </div>
                </td>
              </tr>
            </table>

            <div>
              <b>ARRENDATARIO:</b>
            </div>
            <table class="table border">
              <tr>
                <td class="w-50">
                  <div>
                    <span>ARRENDADOR:</span>
                  </div>
                  <div>
                    {{ rentObject.name }} {{ rentObject.last_name }}
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex">
                    <span>FIRMA:</span>
                    <img class="firm" :src="firm" alt="">
                  </div>
                </td>
              </tr>
            </table>
          </div>
      </section>
    </vue-html2pdf>

  </div>
</template>

<script>
import TopBar from "../../../components/top-bar/topBar";
import BDatepicker from "buefy/src/components/datepicker/Datepicker";
import BCheckbox from "buefy/src/components/checkbox/Checkbox";
import BCarousel from "buefy/src/components/carousel/Carousel";
import BCarouselItem from "buefy/src/components/carousel/CarouselItem";
import BCarouselList from "buefy/src/components/carousel/CarouselList";
import BUpload from "buefy/src/components/upload/Upload";
import {mapActions, mapGetters} from 'vuex'
import {api_rental_service} from "@/urls";
import VueTimepicker from 'vue2-timepicker'
import {TYPE_ACTIVE, TYPE_CLIENT, TYPE_AREA} from "@/enum";
import DigitalFirm from "@/components/form/digital-firm";
import Multiselect from "vue-multiselect";

import VueHtml2pdf from '@/components/vue-html2pdf'

export default {
  name: "rent",
  components: {
    DigitalFirm,
    VueTimepicker,
    BUpload,
    BCarouselList,
    BCarouselItem,
    BCarousel,
    BCheckbox,
    BDatepicker,
    TopBar,
    Multiselect,
    VueHtml2pdf
  },
  data: () => ({
    firm: null,
    firmContract: false,
    post: true,
    isImageModalActive: false,
    imgModal: null,
    dropFiles: [],
    bicycleFull: [],

    station_start: null,
    station_end: null,
    station_start_pdf: null,
    station_end_pdf: null,
    totalPriceBike: null,
    client: null,
    clientList: [],

    rentObject: {
      deleted: true,
      name: '',
      description: '',
      qty_bicycles: 0,
      payment_lease: '',
      start_date: null,
      deliver_date: null,
      start_time: '',
      time_delivery: '',
      helmet: false,
      padlock: false,
      price_padlock: null,
      price_helmets: null,
      quantity_helmets: 0,
      quantity_padlocks: 0,
      slug: null,
      status: null,
      created_by: null,
      updated_by: null,
      fk_enterprise: null,
      fk_account: null,
      rental_station: null,
      delivery_station: null,
      fk_client: null,
      bikes: [],
    },
    workStationList: [],
    attach: false,
    gallery: false,
    al: {
      hasGrayscale: false,
      itemsToShow: 2,
    },
    attaches: [],
    optionsPdf: {
      margin: [10, 10],
      filename: `Contrato de renta`,
      pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
    }
  }),
  methods: {
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      saveRent: 'SAVE_SERVICE_RENT',
      editRent: 'EDIT_SERVICE_RENT',
      updateValues: 'UPDATE_VALUES',
      fetchAreas: 'FETCH_AREAS',
      fetBicycleStock: 'FETCH_AFT',
      fetchTypeIncome: 'FETCH_TYPE_INCOME',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST',
      fetchClient: 'FETCH_CLIENT',
      saveClient: 'SAVE_CLIENT' //TODO
    }),
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_rental_service}${id}/`)
          .then(item => {
            this.rentObject = item;
            this.rentObject.start_time = item.start_time.substring(0, 5);
            this.rentObject.time_delivery = item.time_delivery.substring(0, 5);
            item.images.forEach(img => {
              this.attaches.push(img.file)
            })
            this.item_id = item.id
          });
    },
    save() {
      return new Promise(resolve => {
        this.rentObject.fk_enterprise = localStorage.getItem('enterprise_id');
        if (this.post)
          this.saveRent(this.rentObject)
        else
          this.editRent(this.rentObject)
        resolve(true)
      })


    },
    selectName({numero, modelo, marca}) {
      return `Numero:${numero}-Modelo:${modelo}-Marca:${marca}`
    },
    generateContract() {
      this.firmContract = true
    },
    onProgress(event) {
      console.log(event);
    },
    hasGenerated(event) {
      console.log(event);
    },
    hasStartedGeneration() {
    },
    generateReport() {
      this.firm = localStorage.getItem('firm-habici')
      this.save().then(value => {
        if (value){
          this.$refs.html2Pdf.generatePdf()
        }
      })

    },
    getWorkStationRent() {
      this.workStationList = []
      let query = `?page=1&page_size=1000`
      this.fetchAreas(query).then(value => {
        value.results.forEach(result => {
          if (result.type === TYPE_AREA.RENTA) {
            this.workStationList.push(result)
          }
        });
      });
    },
    getBicycleStock(area) {
      let id_area = this.workStationList.find(a => a.id === area)
      let query = `?page=1&page_size=1000&tipo_activo=${TYPE_ACTIVE.AFB}`
      this.bicycle_stock_list = [];
      this.fetBicycleStock(query).then(value => {
        value.results.forEach(result => {
          if (result.fk_area_id === id_area.id && result.disponible) {
            this.bicycle_stock_list.push(result)
          }
        })
      })
    },
    formatAMPM(d) {
      return d ? `${d.hh}:${d.mm} ${d.A}` : ''
    },

    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '-' +
            ((month < 10 ? '0' : '') + month) + '-' +
            ((day < 10 ? '0' : '') + day)
      }
      return ''
    },

    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
      this.attaches.splice(index, 1)
    },
    showImg(img) {
      this.isImageModalActive = true;
      this.imgModal = img;
    },
    getImgUrl() {
      this.dropFiles.forEach(file => {
        if (file !== undefined) {
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener('load', () => {
            this.setPictures(fr.result)
            this.setAttaches(fr.result)
          })
        }
      })

    },
    setPictures(img) {
      if (this.rentObject.pictures.indexOf(img) === -1) {
        this.rentObject.pictures.push(img)
      }
    },
    setAttaches(img) {
      if (this.attaches.indexOf(img) === -1) {
        this.attaches.push(img)
      }
    },
    getClientList() {
      this.clientList = []
      let query = `?page=1&page_size=1000`
      this.fetchClient(query).then(value => {
        this.clientList = value.results
      });
    },
    doCreate() {
      this.getClientList();
      this.getWorkStationRent();
      // this.fetchTypeIncome(`?page=1&page_size=1000`)
      // if (this.$route.params.id) {
      //   this.update_values();
      // }
    }

  },
  watch: {
    dropFiles: function () {
      this.getImgUrl();
    },
    bicycle: function () {
      let temp = []
      this.bicycleFull = []
      this.totalPriceBike = 0
      this.bicycle.forEach(item => {
        temp.push(item.id)
        this.bicycleFull.push(item)
        this.totalPriceBike += item.precio_compra
      })
      this.rentObject.bicycle = temp
    },
    'rentObject.rental_station': function () {
      this.station_start_pdf = this.workStationList.find(f => f.id === this.rentObject.rental_station)
      this.getBicycleStock(this.station_start);
    },
    'rentObject.delivery_station':function () {
      this.station_end_pdf = this.workStationList.find(f => f.id === this.rentObject.delivery_station)
    },
    'client.typeClient': function () {
      this.isHabitual = this.client.typeClient === TYPE_CLIENT.HABITUAL;
    }


  },
  created() {
    this.doCreate()
  },
  computed: {
    ...mapGetters({
      list_cash_type: 'GET_TYPE_CASH',
      bicycle_stock_list: 'GET_BICYCLE_STOCK_LIST',
      list_type_income: 'GET_TYPE_INCOME'
    }),
    quantity_bike() {
      return this.rentObject.bikes.length
    },
  }
}
</script>

<style scoped lang="scss">
.client-data {
  font-size: 17px;
  color: #000000;
}

.textarea {
  height: 84px !important;
  box-shadow: none;
}

.select {
  box-shadow: none;
}

.custom-w {
  width: 35%;
}

.timepicker .dropdown-content .control .select select {
  font-weight: 600;
  padding-right: calc(0.75em - 1px);
  border: 0;
  height: 50px !important;
}

.report-pdf {
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
  padding: 15px;

  .table {
    font-size: 12px;
    line-height: 1.5;
    width: 100%;
    border: 1px solid #000;
    //border-collapse: collapse;

    .w-50 {
      width: 50%;
    }

    th, td {
      border: 1px solid;
    }
  }

  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 12px;
  }

  .border {
    border: 1px solid;
  }

  .firm {
    width: auto;
    height: 100px;
  }
}
</style>
