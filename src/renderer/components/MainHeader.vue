<template>
  <header class="main-header">
    <a href="#" class="logo">
      <span class="logo-mini"><b>H</b>C</span>
      <span class="logo-lg"><b>Hi</b>Cube</span>
    </a>
    <nav class="navbar navbar-static-top" role="navigation">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a href="#" data-toggle="modal" data-target="#modal-add">
              <i class="fa fa-plus"></i>
            </a>
          </li>
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 10 notifications</li>
              <li>
                <ul class="menu">
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img src="static/img/me.png" class="user-image" alt="User Image">
              <span class="hidden-xs">0z0ne</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="static/img/me.png" class="img-circle" alt="User Image">
                <p>
                  0z0ne - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="modal fade" id="modal-add" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">添加服务器</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
                <div class="box-body">
                  <div :class="['form-group', {'has-success': nameValid, 'has-error': !nameValid}]">
                      <label for="inputName" class="col-sm-2 control-label">名称</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputName" v-model="name" placeholder="配置名称" type="text">
                      </div>
                  </div>
                  <div  :class="['form-group', {'has-success': urlValid, 'has-error': !urlValid}]">
                      <label for="inputHost" class="col-sm-2 control-label">地址</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputHost" v-model="url" placeholder="如：192.168.1.2:6379, 192.168.3:6379" type="text">
                      </div>
                  </div>
                </div>
                <!-- /.box-body -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="onAddServer">添加</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </header>

</template>

<style scoped>
.main-header {
  z-index: 1050;
}
.modal-dialog {
  margin: 90px auto;
} 
</style>

<script>
import {app, remote, ipcRenderer} from 'electron'
import Store from 'electron-store'
import Profile from '../../main/Profile'

console.log((app || remote.app).getPath('userData'))
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})


function addProfile(profile) {
  console.log((app || remote.app).getPath('userData'))
  const store = new Store()
  let profiles = store.get('profiles')
  if (!profiles) {
    profiles = []
  }
  profiles.push(profile)
  store.set('profiles', profiles)
}

ipcRenderer.send('asynchronous-message', 'ping')
export default {
  name: 'MainHeader',
  data () {
    return {
      name: '',
      nameValid: false,
      url: '',
      urlValid: false
    }
  },
  watch: {
    name: function (newVal, oldVal) {
      if (Profile.isValidDescription(newVal)) {
        this.nameValid = true
      } else {
        this.nameValid = false
      }
    },
    url: function (newVal, oldVal) {
      if (Profile.isValidUrl(newVal)) {
        this.urlValid = true
      } else {
        this.urlValid = false
      }
    }
  },
  methods: {
    onAddServer: function () {
        if (!this.nameValid || !this.urlValid) {
          console.log('配置格式不正确，name [%s], url [%s]', this.name, this.url)
          return
        }
        let profile = new Profile()
        profile.description = this.name
        profile.server = profile.parseUrl(this.url)
        console.log(profile)
        addProfile(profile)
        window.$('#modal-add').hide()
    }
  }
}
</script>


