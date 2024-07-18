<script setup lang="ts">
import { RouterView } from 'vue-router'

import { supabase } from '@/lib/supabaseClient'

import TopNavbar from '@/components/Layout/TopNavbar.vue'
import SideBar from '@/components/Layout/Sidebar.vue'

console.log(supabase)
</script>

<template>
  <SideBar> </SideBar>
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar></TopNavbar>
    <main>
      <RouterView />
    </main>
  </div>
</template>
