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
      <ul class="sidebar-menu tree" data-widget="tree">
        <li class="header">HEADER</li>
        <li :class="getItemClass(profile)" :key="index" v-for="(profile, index) in profiles" @click="onSelected(index)">
            <a href="#">
              <i class="fa fa-plug" v-bind:class="{'text-success': profile.connected}"></i>
              <span>{{ profile.name }}</span>
              <span v-if="profile.cluster" class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul v-if="profile.cluster" class="treeview-menu">
              <li v-for="(server, index) in profile.servers" :key="index">
                <a href="#">
                  <i class="fa fa-circle"></i>
                  <span>{{ server.host }}: {{ server.port}}</span>
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
import Bus from '../Bus'
import BusEvent from '../BusEvent'

const CURRENT_HOST = '192.168.1.5'
let profiles = [{
    name: '开发环境',
    selected: false,
    cluster: false,
    connected: false,
    servers: [{
        host: "192.168.1.1",
        port: "6379"
    }]
}, {
    name: '测试环境',
    selected: false,
    cluster: false,
    connected: false,
    servers: [{
        host: "192.168.1.2",
        port: "6379"
    }]
}, {
    name: '预发环境',
    selected: false,
    cluster: false,
    connected: false,
    servers: [{
        host: "192.168.1.3",
        port: "6379"
    }]
}, {
    name: '正式环境',
    selected: false,
    cluster: false,
    connected: false,
    servers: [{
        host: "192.168.1.4",
        port: "6379"
    }]
}, {
    name: '开发集群',
    selected: false,
    cluster: true,
    connected: false,
    servers: [{
        host: "192.168.1.5",
        port: "30001"
    }, {
        host: "192.168.1.5",
        port: "30002"
    }, {
        host: "192.168.1.5",
        port: "30003"
    }]
}, {
    name: '测试集群',
    selected: false,
    cluster: true,
    connected: false,
    servers: [{
        host: "192.168.1.5",
        port: "30001"
    }, {
        host: "192.168.1.5",
        port: "30002"
    }, {
        host: "192.168.1.5",
        port: "30003"
    }]
}]

export default {
  name: "MainSidebar",
  data() {
    return {
      profiles: profiles
    }
  },
  methods: {
    getItemClass: function (profile) {
      return {
        'active': profile.selected,
        'treeview': profile.cluster,
      }
    },
    changeSelectStatus: function (index) {
      profiles.forEach(function (profile, i) {
        if (i == index) {
          profile.selected = true
        } else {
          profile.selected = false
        }
      })
    },
    onSelected: function (index) {
      this.changeSelectStatus(index)
      Bus.$emit(BusEvent.ON_SERVER_ITEM_SELECTED, profiles[index])
      console.log('EMIT -- ', index)
    }
  }
}
</script>
