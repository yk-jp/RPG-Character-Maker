<template>
  <div class="game-maker">
    <div class="container pt-5">
      <h5 class="text-white font-weight-bold">表示エリア</h5>

      <div class="card mb-3 rounded-3" style="background: #313031">
        <div class="row g-0 px-2">
          <div
            class="col-md-3 d-flex justify-content-center align-items-center"
          >
            <div class="col-12 border border-white border-5 rounded-3 img-fit">
              <img
                :src="updatedImg"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
          </div>
          <div class="col-md-9 text-white">
            <div class="card-body px-2">
              <div class="border border-white border-4 rounded-3 px-3 py-1">
                <h5 class="card-title">Name : {{ profile.name.value }}</h5>
                <h5 class="card-title">Class : {{ profile.class.value }}</h5>
                <h5 class="card-title">Gender : {{ profile.gender.value }}</h5>
                <h5 class="card-title m-0">
                  Traits : {{ profile.traits.value }}
                </h5>
              </div>
              <div
                class="mt-2 border border-white border-4 rounded-3 px-3 py-1"
              >
                <h5 class="card-title">Strength : {{ ability.strength }}</h5>
                <h5 class="card-title">Agility : {{ ability.agility }}</h5>
                <h5 class="card-title">
                  Resilience : {{ ability.resilience }}
                </h5>
                <h5 class="card-title">Wisdom : {{ ability.wisdom }}</h5>
                <h5 class="card-title m-0">Luck : {{ ability.luck }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <h5 class="text-white font-weight-bold">入力エリア</h5>

      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1 col-form-label text-white"
          >Name</label
        >
        <div class="col-sm-3">
          <input
            v-model="profile.name.value"
            type="text"
            class="form-control"
            id="inputName"
          />
        </div>
      </div>

      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1 col-form-label text-white"
          >Gender</label
        >
        <div class="col-sm-3 mt-2">
          <div class="form-check form-check-inline">
            <input
              v-model="profile.gender.value"
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="male"
            />
            <label class="form-check-label text-white" for="inlineRadio1"
              >Male</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              v-model="profile.gender.value"
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="female"
            />
            <label class="form-check-label text-white" for="inlineRadio2"
              >Female</label
            >
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1 col-form-label text-white"
          >Class</label
        >
        <div class="col-sm-3">
          <select
            v-model="profile.class.value"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="hero">Hero</option>
            <option value="warrior">Warrior</option>
            <option value="mage">Mage</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="inputName" class="col-sm-1 col-form-label text-white"
          >Traits</label
        >
        <div class="col-sm-3">
          <select
            v-model="profile.traits.value"
            @change="updateAbility"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="everyman">Everyman</option>
            <option value="bat out of hell">Bat out of hell</option>
            <option v-if="isHero" value="brave">Brave</option>
            <option v-if="isGenderMale" value="lucky devil">Lucky devil</option>
            <option v-else value="tomboy">Tomboy</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from "vue";
// img
import Character from "../assets/character/Character";
// interface
import ICharacterImg from "@/interface/ICharacterImg";
// type
import TCharacterClass from "@/types/TCharacterClass";
import TCharacterGender from "@/types/TCharacterGender";
import TCharacterTraits from "@/types/TCharacterTraits";

export default defineComponent({
  name: "Home",
  setup() {
    const profile = {
      name: ref<string>("Unknown"),
      class: ref<TCharacterClass>("hero"),
      gender: ref<TCharacterGender>("male"),
      traits: ref<TCharacterTraits>("everyman"),
    };

    const ability = {
      strength: ref<number>(10),
      agility: ref<number>(10),
      resilience: ref<number>(10),
      wisdom: ref<number>(10),
      luck: ref<number>(10),
      initialize: () => { 
        ability.strength.value=10;
        ability.agility.value=10;
        ability.resilience.value=10;
        ability.wisdom.value=10;
        ability.luck.value=10;
      }
    };

    const isGenderMale = computed(() => {
      return profile.gender.value === "male";
    });

    const updatedImg = computed(() => {
      const characterClass: string = profile.class.value as string;
      const characterGender: string = profile.gender.value as string;

      return (Character as ICharacterImg | any)[characterGender][
        characterClass
      ];
    });

    const isHero = computed(() => {
      return profile.class.value === "hero";
    });

    const updateAbility = computed(() => {
      ability.initialize();

      if (profile.traits.value === "bat out of hell") {
        ability.agility.value *= 1.4;
      } else if (profile.traits.value === "lucky devil") {
        ability.luck.value *= 1.5;
      } else {
        ability.strength.value *= 1.1;
        ability.agility.value *= 1.1;
        if (profile.traits.value === "brave") {
          ability.luck.value *= 1.2;
        }
      }
    });

    return {
      profile,
      updatedImg,
      ability,
      updateAbility,
      isGenderMale,
      isHero,
    };
  },
});
</script>

<style scoped>
.game-maker {
  font-family: National2CompressedWeb, "Helvetica Condensed", "Arial Narrow",
    sans-serif;
  letter-spacing: 0.05rem;
  background: #326826;
}

.game-maker p {
  margin: 0;
}

.img-fit {
  object-fit: contain;
}
</style>
