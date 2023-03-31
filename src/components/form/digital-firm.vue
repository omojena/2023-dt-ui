<template>
        <section>
          <vueSignature ref="signature" :sigOption="option" :w="'800px'" :h="'400px'" :disabled="disabled"
                        :defaultUrl="dataUrl"></vueSignature>
          <b-button class="is-green-success" @click="save">Guardar</b-button>
          <b-button class="is-danger" @click="clear">Borrar</b-button>
          <b-button class="is-dark-light" @click="undo">Paso Atras</b-button>
          <!--      <button @click="addWaterMark">addWaterMark</button>-->
          <!--      <button @click="handleDisabled">disabled</button>-->
        </section>
</template>
<script>
import vueSignature from "vue-signature"

export default {
  name: "digital-firm",
  components: {
    vueSignature
  },
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      },
      disabled: false,
      dataUrl: ""
    };
  },

  methods: {
    save() {
      let _this = this;
      let png = _this.$refs.signature.save()
      // let jpeg = _this.$refs.signature.save('image/jpeg')
      // let svg = _this.$refs.signature.save('image/svg+xml');
      // console.log(png);
      localStorage.setItem('firm-habici', png)
      _this.$emit('firm', png)
      _this.$emit('completed')
      _this.$emit('close')
      // console.log(jpeg)
      // console.log(svg)
    },
    clear() {
      let _this = this;
      _this.$refs.signature.clear();
    },
    undo() {
      let _this = this;
      _this.$refs.signature.undo();
    },
    addWaterMark() {
      let _this = this;
      _this.$refs.signature.addWaterMark({
        text: "mark text",          // watermark text, > default ''
        font: "20px Arial",         // mark font, > default '20px sans-serif'
        style: 'all',               // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
        fillStyle: "red",           // fillcolor, > default '#333'
        strokeStyle: "blue",	   // strokecolor, > default '#333'
        x: 100,                     // fill positionX, > default 20
        y: 200,                     // fill positionY, > default 20
        sx: 100,                    // stroke positionX, > default 40
        sy: 200                     // stroke positionY, > default 40
      });
    },
    fromDataURL(url) {
      let _this = this;
      _this.sig.fromDataURL(url)
    },
    handleDisabled() {
      let _this = this;
      _this.disabled = !_this.disabled
    }
  }
};
</script>



