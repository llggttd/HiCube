<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="static/img/me.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>0z0ne</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
        </div>
      </form>   
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">HEADER</li>
        <li v-bind:class="{'active': isActive(server), 'treeview': isCluster(server)}" v-bind:key="JSON.stringify(server)" v-for="server in servers" v-on:click="onSelected(this)">
            <a href="#">
              <i class="fa fa-plug" v-bind:class="{'text-success': isActive(server)}"></i>
              <span v-if="isCluster(server)">reids集群</span>
              <span v-else>{{ server.host }}</span>
              <span v-if="isCluster(server)" class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul v-if="isCluster(server)" class="treeview-menu">
              <li v-for="item in server" v-bind:key="JSON.stringify(item)">
                <a href="#">
                  <i class="fa fa-plug"></i>
                  <span>{{ item.host }}: {{ item.port}}</span>
                </a>
              </li>
            </ul>
        </li>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: "MainSidebar",
  data() {
    return {
      servers: [
        { host: "192.168.1.1", port: "30001" },
        { host: "192.168.1.2", port: "30001" },
        { host: "192.168.1.3", port: "30001" },
        { host: "192.168.1.4", port: "30001" },
        { host: "192.168.1.5", port: "30001" },
        { host: "192.168.1.6", port: "30001" },
        [
          { host: "192.168.1.8", port: "30001" },
          { host: "192.168.1.8", port: "30002" },
          { host: "192.168.1.8", port: "30003" }
        ]
      ]
    };
  },
  methods: {
    isActive: function(server) {
      return server.host === "192.168.1.3";
    },
    isCluster: function(server) {
      return Array.isArray(server);
    },
    onSelected: function (e) {
      console.log(e)
    }
  }
};
</script>
