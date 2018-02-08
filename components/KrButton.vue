<template>
  <div class="joker-button" @click="handleClick">
      <slot></slot>
  </div>
</template>

<script>
 export default {
   props:{
    
   },
   methods:{
     handleClick(event){
       this.$emit('click',event)
     }
   }
 }
</script>

<style>
.joker-button {
  
}


</style>
