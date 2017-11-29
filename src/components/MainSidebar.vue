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
        <li v-bind:class="{'active': server.host === '192.168.1.5'}" v-bind:key="server.host"
        v-for="server in servers">
            <a href="#"><i class="fa fa-link"></i><span>{{ server.host }}</span></a>
        </li>
        <li class="treeview">
          <a href="#"><i class="fa fa-link"></i> <span>Multilevel</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#">Link in level 2</a></li>
            <li><a href="#">Link in level 2</a></li>
          </ul>
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
        {
          host: "192.168.1.1",
          port: "30001"
        },
        {
          host: "192.168.1.2",
          port: "30001"
        },
        {
          host: "192.168.1.3",
          port: "30001"
        },
        {
          host: "192.168.1.4",
          port: "30001"
        },
        {
          host: "192.168.1.5",
          port: "30001"
        },
        {
          host: "192.168.1.6",
          port: "30001"
        }
      ]
    }
  }
}
</script>
