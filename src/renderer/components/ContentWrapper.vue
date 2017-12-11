<template>
  <div class="content-wrapper">
    <section v-if="profile.connected" class="content-header">
      <h1>
        {{ profile.description }}
        <small>{{ profile.isCluster ? '集群':'单机' }}</small>
      </h1>
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
      <div class="row" style="margin-top:5px;">
        <div class="col-sm-6 panel-key">
          <div class="box box-widget">
              <div class="box-header">
                  <h3 class="box-title">查询结果</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body table-bordered no-padding"  style="max-height:600px;overflow-y:scroll">
                  <table class="table table-hover">
                      <tbody>
                          <tr>
                              <td><span class="label label-success">String</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-primary">Hash</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-warning">List</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="label label-danger">SET</span>
                              </td>
                              <td>219</td>
                          </tr>
                          <tr>
                              <td><span class="label label-success">String</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-primary">Hash</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-warning">List</span></td>
                              <td>redis:key:help:redis:key:helpredis:key:help:redis:key:helpredis:key:help:redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="label label-danger">SET</span>
                              </td>
                              <td>219</td>
                          </tr>
                          <tr>
                              <td><span class="label label-success">String</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-primary">Hash</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td><span class="label label-warning">List</span></td>
                              <td>redis:key:help</span></td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="label label-danger">SET</span>
                              </td>
                              <td>219</td>
                          </tr>
    
                      </tbody>
                  </table>
              </div>
              <!-- /.box-body -->
          </div>
        </div>
        <div class="col-sm-6 panel-value">
          <div class="box box-widget">
              <div class="box-header with-border">
                  <div class="key-info-block">
                      <span class="label label-success">String</span>
                      <br/>
                      <span class="label label-default key-string">SharedSharedSharedSharedSharedSharedSharedSharedSharedSharedSharedSharedShared</span>
                  </div>
                  <!-- /.user-block -->
                  <div class="box-tools">
                      <button type="button" class="btn btn-box-tool" data-widget="remove">
                          <i class="fa fa-refresh"></i>
                      </button>
                  </div>
                  <!-- /.box-tools -->
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="form-group value-info-block">
                    <textarea class="form-control" rows="5" placeholder="..."></textarea>
                </div>
              </div>
              <!-- /.box-body -->
              <div class="box-footer box-comments" style="">
                  <div class="box-comment">
                      <!-- User image -->
                      <img class="img-circle img-sm" src="static/img/me.png" alt="User Image">

                      <div class="comment-text">
                          <span class="username">
                              Maria Gonzales
                              <span class="text-muted pull-right">8:03 PM Today</span>
                          </span>
                          <!-- /.username -->
                          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                      </div>
                      <!-- /.comment-text -->
                  </div>
                  <!-- /.box-comment -->
                  <div class="box-comment">
                      <!-- User image -->
                      <img class="img-circle img-sm" src="static/img/me.png" alt="User Image">

                      <div class="comment-text">
                          <span class="username">
                              Luna Stark
                              <span class="text-muted pull-right">8:03 PM Today</span>
                          </span>
                          <!-- /.username -->
                          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                      </div>
                      <!-- /.comment-text -->
                  </div>
                  <!-- /.box-comment -->
              </div>
              <!-- /.box-footer -->
              <div class="box-footer" style="">
                  <form action="#" method="post">
                      <img class="img-responsive img-circle img-sm" src="static/img/me.png" alt="Alt Text">
                      <!-- .img-push is used to add margin to elements next to floating images -->
                      <div class="img-push">
                          <input class="form-control input-sm" placeholder="Press enter to post comment" type="text">
                      </div>
                  </form>
              </div>
              <!-- /.box-footer -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Bus from "@/renderer/Bus"
import BusEvent from "@/renderer/BusEvent"

export default {
  name: "ContentWrapper",
  data () {
    return {
      profile: {
        description: '',
        connected: false,
        isCluster: false
      }
    }
  },
  created () {
    let _that = this
    Bus.$on(BusEvent.ON_SERVER_ITEM_SELECTED, function (data) {
      console.log(data)
      _that.profile.description = data.description
      _that.profile.isCluster = data.isCluster
      _that.profile.connected = true
    })
  }
}
</script>

