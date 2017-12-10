<template>
  <div id="app" class="wrapper">
    <MainHeader/>
    <MainSidebar/>
    <ContentWrapper/>
    <MainFooter/>
    <ControlSidebar/>
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
import MainHeader from '@/renderer/components/MainHeader'
import MainSidebar from '@/renderer/components/MainSidebar'
import ContentWrapper from '@/renderer/components/ContentWrapper'
import MainFooter from '@/renderer/components/MainFooter'
import ControlSidebar from '@/renderer/components/ControlSidebar'

export default {
  name: 'app',
  components: {
    MainHeader,
    MainSidebar,
    ContentWrapper,
    MainFooter,
    ControlSidebar
   }
}
</script>