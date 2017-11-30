<template>
  <div class="content-wrapper">
    <section v-if="profile.connected" class="content-header">
      <h1>
        {{ profile.name }}
        <small>{{ profile.cluster ? '集群':'单机' }}</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>
    <section v-if="profile.connected" class="content container-fluid">
      <div class="input-group">
        <input type="text" name="query" class="form-control" placeholder="查询...">
        <span class="input-group-btn">
            <button type="submit" name="search" class="btn btn-flat btn-success">
              <i class="fa fa-search"></i>
            </button>
          </span>
      </div>
      <!--------------------------
        | Your Page Content Here |
        -------------------------->
    </section>
  </div>
</template>

<script>
import Bus from "../Bus"
import BusEvent from "../BusEvent"

let profile = {
  name: '',
  cluster: false,
  connected: false
}

Bus.$on(BusEvent.ON_SERVER_ITEM_SELECTED, function(data) {
  profile.name = data.name
  profile.port = data.cluster
  profile.connected = true
})

export default {
  name: "ContentWrapper",
  data() {
    return {
      profile: profile
    }
  }
}
</script>

