<template>
  <div class="vue-pdf">
    <div class="toolbar" ref="vuePDFToolbar"></div>
    <div class="vue-pdf-content" ref="vuePdfContent"></div>
  </div>
</template>

<script>

  export default {
    name:"VuePdf",
    props:{
      pdfurl:{
        default:'',
        type:String
      }
    },
    data(){
      return {
        pdfDoc:null,
        pageNum:1,
        page_num:0,//当前的页数
        page_count:0,
        scale:1,
        maxscale:2,
        minscale:0.8,
        pageNumPending:null,
        pageRendering:false,
      }
    },
    methods:{
      renderPage(num){
        var that = this;
        this.pageRendering = true;
        let tagCanvas = document.createElement('canvas');
        tagCanvas.id = 'pdf-content' + num;
        tagCanvas.className = 'pdf-page';
        that.$refs.vuePdfContent.appendChild(tagCanvas);
        // let canvas = document.getElementById('pdf-content'+num);
        let canvas =tagCanvas;
        console.log(this.scale,"???")
        let ctx = tagCanvas.getContext('2d');
        this.pdfDoc.getPage(num).then(function(page){
          var viewport = page.getViewport(that.scale);
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext:ctx,
            viewport:viewport,
          }
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function(){
            console.log("-----",num)
            that.pageRendering = false;
            if(that.pageNumPending != null){
              that.renderPage(that.pageNumPending);
              that.pageNumPending = null;
            }
          })
        })
        this.page_num = this.pageNum;
        
      }
    },
    mounted(){
    
      let that = this;
      console.log("scale",this.scale)
      PDFJS.getDocument(that.pdfurl).then(function(pdfDoc_){
       
        that.pdfDoc = pdfDoc_;
        var pageNum = that.pdfDoc.numPages;
        that.page_count = pageNum;
        for(let i=1;i<=pageNum;i++){
          that.renderPage(i)
        }
        
      })
      
    }
  }
</script>

<style lang="less" scoped>
.vue-pdf {

}
</style>