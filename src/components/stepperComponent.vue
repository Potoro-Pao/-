<template>
  <div class="stepper-container">
    <div class="steps">
      <div
        v-for="step in steps"
        :key="step.number"
        :class="{
          active: currentStep === step.number,
          completed: currentStep > step.number,
        }"
        class="step"
      >
        <div class="step-number">{{ step.number }}</div>
        <div class="step-title">{{ step.title }}</div>
        <div v-if="step.number < steps.length" class="step-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      steps: [
        { number: 1, title: 'Your Shopping Cart' },
        { number: 2, title: 'Complete Your Information' },
        { number: 3, title: 'Confirm Your Payment' },
      ],
    };
  },
};
</script>

<style scoped>
.stepper-container {
  background-color: #3e2723; /* 較深棕色 */
  padding: 20px;
  border-radius: 5px;
}

.steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
}

.step {
  text-align: center;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  background-color: #6d4c41; /* 中度棕色 */
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff3e0; /* 淺棕色 */
  transition:
    background-color 0.3s,
    color 0.3s;
}

.step-title {
  color: #fff3e0; /* 淺棕色 */
  font-size: 14px;
  margin-top: 8px;
}

.active .step-number {
  background-color: #d7ccc8; /* 淺棕色 */
  color: #3e2723; /* 較深棕色 */
}

.completed .step-number {
  color: #fff3e0; /* 淺棕色 */
  background-color: #6d4c41; /* 中度棕色 */
}

.step-line {
  height: 5px;
  width: 100%;
  background-color: #6d4c41; /* 中度棕色 */
  position: absolute;
  top: 18px; /* 調整到step-number的中間 */
  left: 0;
  z-index: -1;
}

.completed .step-line {
  background-color: #d7ccc8; /* 淺棕色 */
}
</style>
