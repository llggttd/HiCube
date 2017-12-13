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
        <li :class="getItemClass(profile)" :key="profile.uid" v-for="profile in profiles" @click="onItemSelected(profile.uid)">
            <a href="#">
              <i class="fa fa-plug" v-bind:class="{'text-success': profile.connected}"></i>
              <span>{{ profile.description }}</span>
              <span v-if="profile.isCluster" class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul v-if="profile.isCluster" class="treeview-menu">
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
import MsgConfig from '@/main/plugins/config/MSG'

function transProfile(profiles) {
  return profiles.map(function (profile) {
    return {
      uid: profile.uid,
      description: profile.description,
      selected: false,
      isCluster: profile.isCluster,
      connected: false,
      servers: profile.server
    }
  })
}

function reload(target) {
  ipcRenderer.send(MsgConfig.ASYNC_PROFILE_LOAD)
  ipcRenderer.on(MsgConfig.ASYNC_PROFILE_LOAD, (event, arg) => {
    let profiles = transProfile(arg)
      console.log(profiles)
      target.profiles = profiles
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
      reload(this)
      ipcRenderer.on(MsgConfig.ASYNC_PROFILE_RELOAD, (event, arg) => {
        reload(this)
      })
  },
  methods: {
    getItemClass: function (item) {
      return {
        'active': item.selected,
        'treeview': item.cluster,
      }
    },
    getItem: function (uid) {
      return this.profiles.find(function (item) {
        if (item.uid === uid) {
          return true
        } else {
          return false
        }
      })
    },
    changeItemStatus: function (uid) {
      this.profiles.forEach(function (item) {
        if (item.uid === uid) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    onItemSelected: function (uid) {
      this.changeItemStatus(uid)
      Bus.$emit(BusEvent.ON_SERVER_ITEM_SELECTED, this.getItem(uid))
      console.log('EMIT -- %s', uid)
    }
  }
}
</script>
