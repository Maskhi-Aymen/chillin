import "./sidebar.css";
import React from "react";
import {LineStyle,Timeline,TrendingUp,PermIdentity,Storefront,CollectionsBookmark,AssistantOutlined,DynamicFeed,ChatBubbleOutline,WorkOutline,MusicNote,Report,
} from "@material-ui/icons";
import { Drawer } from "@mui/material";
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from "react-router-dom";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'; 


export default function Sidebar() {
  
  return (
    <div className="sidebar">
      
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/publications" className="link">
              <li className="sidebarListItem">
                <CollectionsBookmark className="sidebarIcon" />
                Publications
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Media</h3>
          <ul className="sidebarList">
          <Link to="/playlists" className="link">
              <li className="sidebarListItem">
                <PlaylistPlayIcon className="sidebarIcon" />
                PlayList
              </li>
            </Link>
            <Link to="/songs" className="link">
              <li className="sidebarListItem">
                <MusicNote className="sidebarIcon" />
                Songs
              </li>
            </Link>
            <Link to="/meditate" className="link">
              <li className="sidebarListItem">
                <SelfImprovementIcon className="sidebarIcon" />
                Meditate
              </li>
            </Link>
            <Link to="/plans" className="link">
              <li className="sidebarListItem">
                <DateRangeIcon className="sidebarIcon" />
                Day Plan
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/messages" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
            <Link to="/reports" className="link">
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
/*
         
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
*/