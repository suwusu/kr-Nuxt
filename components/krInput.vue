<template>
  <div class="joker-input" :class="{'joker-input-active':isFocus}">
    <div class="show-text" @click="inputFocus" >{{this.inputText}}<span class="joker-cursor"></span></div>
    <Input type="password" @on-blur="inputBlur" @on-change="inputChange" :autofocus="isFocus"/>
    
  </div>
</template>

<script>
 export default {
   props:{
       autoFocus:{
           type:Boolean,
       }
   },
   methods:{
     handleClick(event){
       this.$emit('click',event)
     },
     inputChange(event){
        this.inputText = event.target.value;
     },
     inputFocus(){
         console.log("------")
         this.isFocus = true;
     },
     inputBlur(event){
         this.isFocus = false;
     },
     getInputClass(){
        return this.isFocus ? 'joker-input joker-input-active' : 'joker-input';
     }
   },
   data(){
        return {
            inputText:'',
            isFocus:false
        }
   },
   mounted(){
       this.isFocus = true;
   }
 }
</script>

<style lang="less" >
.joker-input {
    position: relative;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    .ivu-input{
        opacity: 0;
    }
    .show-text{
            position: absolute;
            width: 100%;
            text-align: left;
            top: 0px;
            left: 0px;
            // background: transparent;
            display: inline-block;
         
            height: 32px;
            line-height: 24px;
            padding: 4px 7px;
            font-size: 12px;
           
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            cursor: text;
        .joker-cursor{
            animation: blink 1s infinite steps(1, start);
            display: inline-block;
            height: 20px;
            width: 1px;
            background: #000;
            vertical-align: middle;
        }
    }
    
   
    @keyframes blink {
        0%, 100% {
            background-color: #000;
            color: #aaa;
        }
        50% {
            background-color: #fff; /* not #aaa because it's seem there is Google Chrome bug */
            color: #000;
        }
    }
}
.joker-input-active{
    border-color: #57a3f3;
     outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}
.joker-input:hover {
    border-color: #57a3f3;
   
}
.joker-input:focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}

</style>
