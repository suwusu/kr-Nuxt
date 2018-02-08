
<template>
  <div class="cpdf">
   <div class="center">
   
      <Button type="info" @click="downSwitch">下载pdf</Button>
      <div style="float:right;padding:0px 0px 0px 20px">
         <!-- <Button @click="prevPage" icon="minus"/> -->
            <!-- {{page_num+'/'+page_count}} -->
          <!-- <Button @click="nextPage" icon="plus"/>   -->
      </div>
      <!-- <Button @click="addScale" icon="plus"></Button>
      
      <Button @click="minusScale" icon="minus"></Button> -->
     </div>
     <div class="pdf-box"  ref="krPdfViewBox"  />
     <KrButton @click="otherPageRender">加载更多</KrButton>
  </div>
</template>


<script>
import KrButton from './KrButton.vue'
 export default {
   components: {
        KrButton
    },
  /**
	 *  @param {String} pdfurl 要显示的pdf的地址
	 *  @param {String, Number} height pdf每一页的默认高度
	 *  @param {Boolean} isScroll 是否懒加载 
	*/
  props: {
    pdfurl:{
      type:String,
      default:'',
    },
  
    height:{
      type:[String, Number],
      default:"auto"
    },
    isScroll:{
      type:Boolean,
      default:true,
    },
    pdfWidth:{
      default:700,
      type:Number
    }
  },

  data() {
    return {
      pdfDoc: null, //pdfjs 生成的对象
      pageNum: 1,//当前的页数
      pageRendering: false,
      pageNumPending: null,
      scale: 1.2,//放大倍数
      page_num: 0,//当前页数
      page_count: 0,//总页数
      maxscale: 2,//最大放大倍数
      minscale: 0.8,//最小放大倍数
      showPageNum:1,//显示的页数
      lazyInitNum:2,//懒加载默认加载的页数
    }
  },

  methods: {
    renderPage(num) { //渲染pdf
        let vm = this
        this.pageRendering = true;
        let tagCanvas = document.createElement("canvas");
        tagCanvas.id = "pdf-view"+num;
        tagCanvas.className = "kr-pdf-page";
        vm.$refs.krPdfViewBox.appendChild(tagCanvas);
        let canvas = document.getElementById('pdf-view'+num)
        let ctx = canvas.getContext('2d');
        this.pdfDoc.getPage(num).then(function(page) {
          var viewport = page.getViewport(vm.scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          vm.pageRendering = false;
          if(vm.pageNumPending !== null) {
            vm.renderPage(vm.pageNumPending);
            vm.pageNumPending = null;
          }
        });
     });
     vm.page_num = vm.pageNum;
    },

    addScale() {//放大
     if(this.scale >= this.maxscale) {
       return
     }
     this.scale += 0.1;
     this.queueRenderPage(this.pageNum)
    },

    minusScale() {//缩小
     if(this.scale <= this.minscale) {
       return
     }
     this.scale -= 0.1;
     this.queueRenderPage(this.pageNum)
    },

    prevPage() {//上一页
     let vm = this
     if(vm.pageNum <= 1) {
       return;
     }
     vm.pageNum--;
     vm.queueRenderPage(vm.pageNum);
    },

    nextPage() {//下一页
     let vm = this
     if(vm.pageNum >= vm.page_count) {
       return;
     }
     vm.pageNum++;
     vm.queueRenderPage(vm.pageNum);
    },
 
    queueRenderPage(num) {
      if(this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    lazyRender(pageNum){
     
      var i = this.showPageNum
      for(;i<pageNum;i++){
        this.renderPage(i);
      }
      this.showPageNum = i;
    },
    otherPageRender(){
      var vm = this;
      var lazyInitNum = vm.page_count>vm.lazyInitNum ? vm.lazyInitNum + vm.showPageNum : vm.page_count;
      vm.lazyRender(lazyInitNum)
    },
    downSwitch(){
      this.$emit('downSwitch');
    }
  },
 
  mounted() {
    let vm = this
    PDFJS.getDocument(vm.pdfurl).then(function(pdfDoc_,demo) { //初始化pdf
      vm.pdfDoc = pdfDoc_;
      vm.page_count = vm.pdfDoc.numPages;
      // for(let i=1;i<=vm.page_count;i++){
      //   vm.renderPage(i);
      // }
      vm.otherPageRender();
     
     
    });
  }
 }
</script>

<style lang="less" scoped>
.cpdf {
  .center{
    height: 40px;
    line-height: 40px;
    margin: 10px 0px;
  }
  .kr-pdf-page{
    display: block;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  }
  .pdf-box{
    overflow:auto;
    width: 100%;
  }
 }
</style>