<template>
  <div class="OVERLAY">
    <div class="OUTER">
      <div class="TOP"></div>
      <div class="RIGHT"></div>
      <div class="ROUND"></div>
    </div>
  </div>
</template>

<style scoped>
.OVERLAY {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.OUTER {
  position: relative;
  width: 200px;
  height: 200px;
}

.OUTER > .TOP,
.OUTER > .RIGHT,
.OUTER > .ROUND {
  position: absolute;
}

.OUTER > .TOP {
  top: 0;
  left: 0;
  height: 60px;
  width: 0;
  border-radius: 10px;
  background: rgb(160, 0, 0);
  animation: openTop 0.3s ease forwards;
}

.OUTER > .RIGHT {
  top: 0;
  right: 0;
  width: 60px;
  height: 0;
  border-radius: 10px;
  background: rgb(160, 0, 0);
  animation: openRight 0.3s ease 0.3s forwards;
}

.OUTER > .ROUND {
  left: 0;
  bottom: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: black;
  transform: scale(0);
  animation: openRound 0.3s ease 0.6s forwards;
}

@keyframes openTop {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes openRight {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}

@keyframes openRound {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
