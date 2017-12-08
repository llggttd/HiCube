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
                  <div class="form-group">
                      <label for="inputName" class="col-sm-2 control-label">名称</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputName" placeholder="配置名称" type="text">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="inputHost" class="col-sm-2 control-label">地址</label>
                      <div class="col-sm-9">
                        <input class="form-control" id="inputHost" placeholder="如：192.168.1.2:6379, 192.168.3:6379" type="text">
                      </div>
                  </div>
                </div>
                <!-- /.box-body -->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">保存</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </header>

</template>

<script>
import {app, remote, ipcRenderer} from 'electron'
import Store from 'electron-store'
import ioredis from 'ioredis'

let store = new Store()
console.log(store.get('name'))
console.log((app || remote.app).getPath('userData'))
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

ipcRenderer.send('asynchronous-message', 'ping')

export default {
  name: 'MainHeader',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.main-header {
  z-index: 1050;
}
.modal-dialog {
  margin: 90px auto;
} 
</style>

