<?php
/**
 * Licensed to The Apereo Foundation under one or more contributor license
 * agreements. See the NOTICE file distributed with this work for
 * additional information regarding copyright ownership.

 * The Apereo Foundation licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 
 * workspace templates template page, used displays the User created
 *
 * @author Patrick Lockley
 * @version 1.0
 * @package
 */


require_once("../../../config.php");

_load_language_file("/website_code/php/workspaceproperties/rss_templates_template.inc");


include "../display_library.php";

include "workspace_library.php";

/**
 * connect to the database
 */

workspace_templates_menu();
$prefix = $xerte_toolkits_site->database_table_prefix;

$database_connect_id = database_connect("Folder_content_template.php connect success","Folder_content_template.php connect failed");

$query_for_rss_templates = "select * from {$prefix}templatedetails, {$prefix}templaterights, "
. "{$prefix}templatesyndication where creator_id= ? and "
. "{$prefix}templatedetails.template_id = {$prefix}templaterights.template_id and "
. "{$prefix}templaterights.template_id  = {$prefix}templatesyndication.template_id "
. "and role=? and (rss= ? or export = ? )" ; 

$params = array($_SESSION['toolkits_logon_id'], 'creator', 'true', 'true');
$query_rss_response = db_query($query_for_rss_templates, $params);

workspace_menu_create(50);

echo "<div style=\"float:left; position:relative; width:15%; height:20px;\">" . RSS_WORKSPACE_RSS . "</div><div style=\"float:left; position:relative; width:15%; height:20px;\">" . RSS_WORKSPACE_EXPORT . "</div>";

foreach($query_rss_response as $row_template_name) {

    echo "<div style=\"float:left; position:relative; width:50%;\">" . str_replace("_","",$row_template_name['template_name']) . "</div><div style=\"float:left; position:relative; width:15%;\">";

    if($row_template_name['rss']){

        echo " " . RSS_WORKSPACE_ON . " ";

    }else{

        echo " " . RSS_WORKSPACE_OFF . " ";

    }

    echo "</div><div style=\"float:left; position:relative; width:15%;\">";
    if($row_template_name['export']){

        echo " " . RSS_WORKSPACE_ON . " ";

    }else{

        echo " " . RSS_WORKSPACE_OFF . " ";

    }

    echo "</div>";

}

echo "</div></div>";
