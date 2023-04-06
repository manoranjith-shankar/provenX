import React from "react";
import "./SideNavBar.css";

const SideNavBar = () => {
	const menuItems = [
		{
			text: "Dashboard",
			icon: "icons/grid.svg",
		},
		{
			text: "Admin Profile",
			icon: "icons/user.svg",
		},
		{
			text: "Messages",
			icon: "icons/message.svg",
		},
		{
			text: "Analytics",
			icon: "icons/pie-chart.svg",
		},
		{
			text: "File Manager",
			icon: "icons/folder.svg",
		},
		{
			text: "Orders",
			icon: "icons/shopping-cart.svg",
		},
		{
			text: "Saved Items",
			icon: "icons/heart.svg",
		},
		{
			text: "Settings",
			icon: "icons/settings.svg",
		},
	];
	return (
		<div className="side-nav-container">
			<div className="nav-upper">
				<div className="nav-heading">
					<div className="nav-brand">
						<img src="icons/logo-white-color.png" alt="" srcset="" />
					</div>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a className="menu-item" href="#">
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							<p>{text}</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;
