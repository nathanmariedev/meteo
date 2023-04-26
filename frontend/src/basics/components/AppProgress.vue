<template>
  <div class="app-progress">
    <div class="part"
      v-for="(step, index) in data" :key="index"
      :class="{
        done: step.status === 'done',
        'in-progress': step.status === 'in-progress',
        'pending': step.status === 'pending',
        'large': step.type === 'large',
        'end': (index < data.length - 1 && data[index + 1].type === 'large') || (index === data.length - 1)
        }">
      <div v-if="step.type === 'large'">
        <svg v-if="step.status === 'done'" class="part-done"  width="100%" height="100%" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <g transform="matrix(1,0,0,1,-492,-2203)">
            <g>
                <g transform="matrix(1,0,0,1,492,2203)">
                    <path class="circle"  d="M27,0C41.812,-0 54,12.188 54,27C54,41.812 41.812,54 27,54C12.188,54 0,41.812 0,27C-0,12.188 12.188,0 27,0Z" style="fill:rgb(103,194,58);fill-rule:nonzero;"/>
                </g>
                <g transform="matrix(1,0,0,1,-6420,-4427)">
                    <path d="M6926.74,6656.58L6935.52,6665.36C6936.11,6665.95 6937.06,6665.95 6937.65,6665.36L6952.61,6650.4C6953.2,6649.81 6953.2,6648.86 6952.61,6648.27C6952.03,6647.69 6951.08,6647.69 6950.49,6648.27L6936.59,6662.18C6936.59,6662.18 6928.86,6654.45 6928.86,6654.45C6928.28,6653.87 6927.32,6653.87 6926.74,6654.45C6926.15,6655.04 6926.15,6655.99 6926.74,6656.58Z" style="fill:white;"/>
                </g>
            </g>
          </g>
        </svg>
        <span v-else class="part-number">{{ step.number }}</span>
        <span class="part-title">{{ step.label }}</span>
      </div>
      <div class="step" v-else>
        <div class="fill"></div>
        <div class="dot"></div>
      </div>
      <div class="step end-step">
        <div class="fill"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [Array],
  },
};
</script>

<style lang="sass">
.app-progress
  display: flex
  align-items: center
  width: 100%
  .part
    width: 100%
    display: flex
    flex-direction: column
    align-items: flex-start
    &.end
      width: 200%
      flex-direction: row
      align-items: center
      .end-step
        display: initial!important
    &.large
      width: auto
      position: relative
    &.done
      .part-number, .step .dot, .step .fill
        background-color: $second-color
      .part-number, .step .dot
        border: $second-color solid 2px
      .part-title
        color: $second-color
    &.in-progress
      .part-number
        background-color: $main-color
        color: white
        border-color: $main-color
      .step .dot
        background-color: white
        border: $main-color solid 2px
      .step .fill
        background-color: $main-color
      .part-title
        color: $main-color
    &.pending
      .part-number, .step .dot
        background-color: white
        color: $light-color
        border: $light-color solid 2px
      .fill
        background-color: $light-color
      .part-title
        color: $light-color
    .part-title
      font-weight: 600
      position: absolute
      width: 80px
      left: -5px
      margin-top: 5px
    .part-done
      width: 30px
      display: flex
      .circle
        fill: $second-color !important
    .part-number
      width: 30px
      height: 30px
      border-radius: 20px
      color: white
      font-weight: 600
      font-size: 16px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
  .step
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
    &.end-step
      display: none
    .dot
      width: 13px
      height: 12px
      border-radius: 10px
      margin: auto
      display: flex
    .fill
      width: 100%
      height: 1px
      background-color: $light-color
</style>
