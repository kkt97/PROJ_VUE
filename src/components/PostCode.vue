<template>
  <div class="postcode-wrapper">
    <div ref="postarea"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("[SHOULD NOT NULL]", this.$refs.postarea);
    new window.daum.Postcode({
      oncomplete: (data) => {
        // context problem this!
        this.$emit("address", data); //emit to parent

        let fullRoadAddr = data.roadAddress;
        let extraRoadAddr = '';

        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
          extraRoadAddr += data.bname;
        }

        if(data.buildingName !== '' && data.apartment === 'Y'){
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }

        if (extraRoadAddr !== ''){
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        if (fullRoadAddr !== ''){
          fullRoadAddr += extraRoadAddr;
        }
        // console.log("[주소"], data);
        this.zip = data.zonecode;
        this.addr1 = fullRoadAddr;
      },
    }).embed(this.$refs.postarea);
  },
}
</script>

<style scoped>

</style>