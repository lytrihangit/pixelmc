const React = require("react");
const { ipcRenderer, shell } = window.require("electron");
const { channels } = window;
import { useRef, useEffect } from "react";
import XSquare from "./XSquare";
import MinimizeRounded from "./MinimizeRounded";
import Expand from "./Expand";
import $ from "jquery";
import { Link } from "react-router-dom";

function Logo() {
	return <img src="./static/media/logo.png"></img>;
}

function ContentsWrapper(props) {
	return <div className="contents-wrapper">{props.children}</div>;
}

function Wrapper(props) {
	return <div className="wrapper">{props.children}</div>;
}

function BigStar() {
	return <svg class="big-star" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18.847 18.847">
		<path id="Path_20" data-name="Path 20" d="M9.343,1,7.068,7.068,1,9.343l6.068,2.275,2.275,6.068,2.275-6.068,6.068-2.275L11.619,7.068Z" transform="translate(1.471 -1.129) rotate(8)" fill="#fff" opacity="0.3"></path>
	</svg>;
}

function SmallStar() {
	return <svg class="sml-star" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 11.3 11.3">
		<path id="Path_21" data-name="Path 21" d="M6,1,4.638,4.638,1,6,4.638,7.367,6,11,7.367,7.367,11,6,7.367,4.638Z" transform="translate(0.541 -1.129) rotate(8)" fill="#fff" opacity="0.3"></path>
	</svg>;
}

function Titlebar(props) {
	return (
		<header className="title-bar">
			<Wrapper>
				<div className="title-bar-logo">
					<Logo />
				</div>
				<div className="title-bar-menu">
					<div id="titlebar-minimize" className="title-bar-menu-item">
						<MinimizeRounded />
					</div>
					<div id="titlebar-expand" className="title-bar-menu-item">
						<Expand />
					</div>
					<div id="titlebar-close" className="title-bar-menu-item">
						<XSquare />
					</div>
				</div>
			</Wrapper>
		</header>
	);
}

function OptionItem(props) {
	const linkRef = useRef();

	useEffect(() => {
		$(linkRef.current).on("click", (e) => {
			if (props.func) props.func();
		});
	}, []);

	return (
		<div className="option-item">
			<div className="item-icon-container">
				<div className="item-icon-circle">
					<i
						style={{
							backgroundImage: props.image
						}}
					></i>
				</div>
			</div>
			<div className="option-text-container">
				<a ref={linkRef} target="_blank" href={props.href} id={props.id}>
					{props.text}
				</a>
			</div>
		</div>
	);
}

function ModsFunc (props) {
	return (
		<div className="option-item">
			<div className="item-icon-container">
				<div className="item-icon-circle">
					<i
						style={{
							backgroundImage: props.image
						}}
					></i>
				</div>
			</div>
			<div className="option-text-container">
				<Link to="/mods">Mods</Link>
			</div>
		</div>
	);
}

function Blur(props) {
	return (
		<div
			style={{
				position: "absolute",
				height: "inherit",
				width: "inherit",
				filter: "blur(8px)",
				zIndex: 3
			}}
		></div>
	);
}

function FriendContainer(props) {
	return (
		<div className="friend-container">
			<div className={`friend-circle ${props.mode}`}>
				<div className="friend-image">
					<img
						style={{
							backgroundImage: props.image
						}}
					/>
				</div>
			</div>
			<span>{props.username}</span>
		</div>
	);
}

function Sidebar(props) {
	function resize() {
		shell.openExternal("https://pixelmc.vn/napthe");
		//ipcRenderer.send(channels.window.resize, JSON.stringify({width: 1380, height: 720, type: 'min'}));
	}

	function discord() {
		shell.openExternal("https://discord.gg/MWeNeRtscp");
	}

	function home() {
		shell.openExternal("https://pixelmc.vn/");
	}

	return (
		<div className="sidebar">
			<div className="sidebar-top blur-comming-soon">
				<div className="sidebar-top-image">
					<img />
				</div>
				<h2>LTH</h2>
			</div>

			<div className="sidebar-middle">
				<div className="sidebar-middle-option-container blur-comming-soon">
					<OptionItem text="Thông tin tài khoản" />
				</div>
				<div className="sidebar-middle-option-container">
					<OptionItem func={home} image='url("./static/media/home.png")' text="Trang Chủ" />
				</div>
				<div className="sidebar-middle-option-container">
					<OptionItem func={discord} image='url("./static/media/discord.png")' text="Discord" />
				</div>
				<div className="sidebar-middle-option-container">
					<OptionItem func={resize} image='url("./static/media/credit-card.png")' text="Nạp Tiền" />
				</div>
				<div className="sidebar-middle-option-container">
					{/* <Link to="/mods">dsada</Link> */}
					<ModsFunc text="Mods"></ModsFunc>
				</div>
				<div className="sidebar-middle-option-container blur-comming-soon">
					<OptionItem text="Trợ giúp" />
				</div>
				<div className="sidebar-middle-option-container blur-comming-soon">
					<OptionItem text="Cài đặt" />
				</div>
				<div className="sidebar-middle-option-container exit-container">
					<OptionItem id="exit-button" image='url("./static/media/exit.png")' text="Đăng Xuất" />
				</div>
			</div>

			<div className="sidebar-bottom blur-comming-soon">
				<div className="sidebar-bottom-friends-group">
					<h2>Bạn bè - Online</h2>
					<FriendContainer image='url("./static/media/1.png")' mode="online" username="Tên 1" />
					<FriendContainer image='url("./static/media/2.png")' mode="offline" username="Tên 2" />
					<FriendContainer image='url("./static/media/3.png")' mode="online" username="Tên 3" />
				</div>
			</div>
		</div>
	);
}

function BouncingBalls(props) {
	return (
		<div>
			<div id="ball-1" className="circle"></div>
			<div id="ball-2" className="circle"></div>
			<div id="ball-3" className="circle"></div>
		</div>
	);
}

export { ContentsWrapper, Wrapper, Titlebar, Logo, Sidebar, BigStar, SmallStar, BouncingBalls };
