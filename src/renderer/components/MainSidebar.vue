<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="static/img/me.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>0z0ne</p>
          <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
        </div>
      </div>
      <a class="header"><i class="fa fa-tv"></i><span>服务器</span></a>
      <ul class="sidebar-menu tree" data-widget="tree">
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
      </ul>
    </section>
  </aside>
</template>

<style scoped>
.main-sidebar .header {
  margin: 0px;
  padding: 15px 25px;
  font-size: 16px;
  display: block;
}
.main-sidebar .header i {
  margin-right: 8px;
}
.main-sidebar .user-panel,
.main-sidebar .header {
  background-color: #112a2c;
}
.main-sidebar .sidebar-menu {
  /* max-height: 600px; */
  overflow-x: hidden;
  overflow-y: hidden;
}

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-track {  
  background-color: #000000;  
}  



</style>

<script>
import {ipcRenderer} from 'electron'
import Bus from '@/renderer/Bus'
import BusEvent from '@/renderer/BusEvent'
import Profile from '@/main/Profile'
import Config from '@/main/plugins/Config'

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

function transProfile(profiles) {
  return profiles.map(function (profile) {
    return {
      uid: profile.uid,
      name: profile.description,
      selected: false,
      cluster: profile.isCluster,
      connected: false,
      servers: profile.server
    }
  })
}

export default {
  name: "MainSidebar",
  data () {
    return {
      profiles: []
    }
  },
  created () {
    ipcRenderer.send(Config.ASYNC_MSG_LOAD_PROFILE)
    ipcRenderer.on(Config.ASYNC_MSG_LOAD_PROFILE, (event, arg) => {
      let profiles = transProfile(arg)
      console.log(profiles)
      this.profiles = profiles
    })
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
