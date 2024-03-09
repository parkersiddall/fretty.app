<template>
  <div>
    <div class="editor">
      <div class="card-image" style="text-align: center; overflow-x: auto">
        <Fretboard
          :tuning="tuning"
          :notes="notes"
          :sharps="sharps"
          :frets="frets"
          :root="root"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note, Scale, Midi, ScaleType } from "@tonaljs/tonal";
import { Tunings } from "../tunings.js";

let ALL_SCALES = [];
for (let scale of ScaleType.all()) {
  ALL_SCALES.push(scale.name);
  ALL_SCALES.push(...scale.aliases);
}

export default {
  name: "Editor",

  components: {
    Fretboard,
  },

  data: function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const queryParams = {};

    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    const defaultUsrTuning = queryParams?.usrTuning || "E A D G B E";
    const defaultSharps = queryParams?.sharps || "sharps";
    const defaultFrets = queryParams?.frets || 18;
    const defaultScaleTonic = queryParams?.scaleTonic || "A";
    const defaultScaleType = queryParams?.scaleType || "minor pentatonic";

    return {
      usr_tuning: defaultUsrTuning,
      sharps: defaultSharps,
      frets: defaultFrets,
      scale: { tonic: defaultScaleTonic, type: defaultScaleType },
    };
  },

  computed: {
    tuning: function () {
      if (!this.usr_tuning) return [];
      return this.usr_tuning.trim().split(" ").map(Note.chroma).reverse();
    },
    root: function () {
      return Note.chroma(this.scale.tonic);
    },
    notes: function () {
      return this.scale_info.notes.map(Note.chroma);
    },
    scale_info: function () {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    scale_search: function () {
      return ALL_SCALES.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.scale.type.toLowerCase()) >= 0
        );
      });
    },
    tuning_search() {
      const newData = [];
      Tunings.forEach((element) => {
        const items = element.tunings.filter(
          (item) =>
            item.tuning.toLowerCase().indexOf(this.usr_tuning.toLowerCase()) >=
            0
        );
        if (items.length) {
          newData.push({ instrument: element.instrument, tunings: items });
        }
      });
      return newData;
    },
  },

  methods: {
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true,
      });
    },
    scale_input(x, y) {
      console.log(y);
      if (x == "") {
        return;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
