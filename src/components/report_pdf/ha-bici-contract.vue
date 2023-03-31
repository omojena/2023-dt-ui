<template>
  <section>
    <b-button @click="generateReport">Test Report</b-button>
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
        pdf-content-width="1000px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"


    >
      <section class="report-pdf" slot="pdf-content" v-if="objectRent">
        <section class="pdf-item">
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
              <th colspan="3" style="border-top: 0 !important;">
                <div class="is-flex is-flex-direction-column">
            <span>
              ESTACIONAMIENTOS:
            </span>
                  <span class="is-flex is-align-items-center">
              <span>DOMICILIO CASA MATRIZ: Calle Prado No. 20 entre San Lázaro y Capdevila</span> <b-checkbox
                      class="ml-4"></b-checkbox>
            </span>
                </div>
              </th>
              <tr>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Parque Cristo:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Calle Teniente Rey esq. Villegas</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Emboque de Luz:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Calle Avenida del Puerto (Lanchita de Regla)</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Almacenes San José:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Avenida del Puerto y Desamparados</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Compostela:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Calle Compostela No. 545 entre
              Muralla y Teniente Rey.</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Plaza de 4 Caminos:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Calle Cristina esquina Manglar
              (Museo del Ferrocarril)</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Hotel Raquel:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Calle Amargura, entre Cuba y San Ignacio</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Plaza Vieja:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Mercaderes y Teniente Rey</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Plazuela de las Urslinas:
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>Monserrate y Muralla.</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                  </div>
                </td>
                <td>
                  <div class="is-flex is-flex-direction-column">
            <span>
             Otro
            </span>
                    <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span style="width: 75%;"></span> <b-checkbox class="ml-4"></b-checkbox>
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
                <td class="w-50">1. NOMBRES Y APELLIDOS O DE LA EMPRESA: {{ objectRent.name }}
                  {{ objectRent.last_name }}
                </td>
                <td class="w-50">DOMICILIO TEMPORAL, PERMANENTE EN CUBA O DE LA ENTIDAD QUE REPRESENTA:
                  {{ objectRent.address }}
                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>C.I:/ D.N.I:/ PASAPORTE/ {{ objectRent.dni }}</span>
                    <span>Código REU:</span>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>TELÉFONOS: {{ objectRent.phone }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>NACIONALIDAD: {{ objectRent.nationality }}</span>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>E-Mail: {{ rentObject.email }}</span>
                  </div>
                </td>
              </tr>
            </table>

            <div>
              OBJETO DEL CONTRATO:
            </div>
            <table class="table border">
              <tr>
                <td class="w-50">CANTIDAD DE BICICLETA(S): {{ objectRent.quantity_bike }}</td>
                <td class="w-50">MODELO(S):</td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>VALOR DE LA BICICLETA(S): 9600 CUP-16800 CUP</span>
                    <span>TOTAL:</span>
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex is-flex-direction-column">
                    <span>ACCESORIOS: Cascos: {{ objectRent.quantity_helmet }}, Candado y Llave:{{ objectRent.quantity_padlock }}</span>
                    <span>VALORES: 600 CUP + 500 CUP =</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">
                  <div class="columns">
                    <div class="column is-half is-flex is-flex-direction-column">
             <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>CLIENTE: HABITUAL:</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                      <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>AGENCIA DE VIAJE:</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                    </div>
                    <div class="column is-half is-flex is-flex-direction-column">
             <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>OCASIONAL:</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                      <span class="is-flex is-align-items-center is-justify-content-space-between">
              <span>EMPRESA:</span> <b-checkbox class="ml-4"></b-checkbox>
            </span>
                    </div>
                  </div>
                </td>
                <td class="w-50">
                  <div>
                    PAGO DE ARRENDAMIENTO: {{ objectRent.pay_rent }}
                  </div>
                  <div class="columns">
                    <div class="column is-half">
                      CUENTAS DE EMPRESA:
                    </div>
                    <div class="column is-half">
                      <div>
                        Tarjeta CUC: 9213 9598 7013 8956
                      </div>
                      <div>
                        Tarjeta CUP: 9212 9598 7019 3358
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-50">
          <span class="is-flex is-align-items-center">HORA DE RECOGIDA: {{ objectRent.hour_ini }}
         AM <b-checkbox class="ml-4"></b-checkbox>
         PM <b-checkbox class="ml-4"></b-checkbox>
          </span>
                </td>
                <td class="w-50">
             <span class="is-flex is-align-items-center">HORA DE ENTREGA: {{ objectRent.hour_ent }}
         AM <b-checkbox class="ml-4"></b-checkbox>
         PM <b-checkbox class="ml-4"></b-checkbox>
          </span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
             <span class="is-flex is-align-items-center">POSIBLE DE ENTREGA DE LA BICICLETA: ______
         P <b-checkbox class="ml-4"></b-checkbox>
         PC <b-checkbox class="ml-4"></b-checkbox>
         L <b-checkbox class="ml-4"></b-checkbox>
         SJ <b-checkbox class="ml-4"></b-checkbox>
         C <b-checkbox class="ml-4"></b-checkbox>
         U <b-checkbox class="ml-4"></b-checkbox>
         R <b-checkbox class="ml-4"></b-checkbox>
         PV <b-checkbox class="ml-4"></b-checkbox>
         4C <b-checkbox class="ml-4"></b-checkbox>
         U <b-checkbox class="ml-4"></b-checkbox>
          </span>
                </td>
              </tr>
            </table>
            <section class="px-5">
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
          </section>
        </section>


        <!--    break page   -->
        <div class="html2pdf__page-break">
          <section class="pdf-item px-5">
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
              el día____/ _____ del 202___.
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
                    <span>ARRENDADOR:</span>
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
                    nombre del Arrendador
                  </div>
                </td>
                <td class="w-50">
                  <div class="is-flex">
                    <span>ARRENDADOR:</span>
                    <img class="firm" :src="firm" alt="">
                  </div>
                </td>
              </tr>
            </table>
          </section>
        </div>
      </section>
    </vue-html2pdf>
  </section>


</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: "ha-bici-contract",
  components: {VueHtml2pdf},
  data() {
    return {
      firm: null,
      optionsPdf: {
        margin: [10, 10],
        filename: `Contrato.pdf`,
        pagebreak: {mode: ['avoid-all', 'css', 'legacy']},
      }
    }
  },
  watch: {
    objectRent: function () {
      console.log(this.objectRent);
      this.generateReport()
    }
  },
  props: {
    objectRent: {
      type: Object,
    }
  },
  methods: {
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
      this.$refs.html2Pdf.generatePdf()
    },
  }
}
</script>

<style scoped lang="scss">
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
    font-size: 18px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 13px;
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