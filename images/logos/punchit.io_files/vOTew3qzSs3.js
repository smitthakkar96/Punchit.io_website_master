/*!CK:1034725634!*//*1441682671,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["pm\/j1"]); }

__d('AdsGraphAPI',['GraphAPI','adsGKCheck'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();'use strict';var j={get:function(){return h('2.3');},getGeneralMigrationVersion:function(){return h('2.4');},getWithGeneralMigration:function(){return j.shouldUseGeneralMigration()?j.getGeneralMigrationVersion():j.get();},shouldUseGeneralMigration:function(){return i('ads_general_2_4_migration');}};f.exports=j;},null);