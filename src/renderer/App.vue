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
import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import ContentWrapper from '@/components/ContentWrapper'
import MainFooter from '@/components/MainFooter'
import ControlSidebar from '@/components/ControlSidebar'

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