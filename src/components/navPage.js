import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

/* eslint-disable import/first */
import { Box } from "@chakra-ui/react"
import { Button, ButtonGroup, Heading, Text, Input } from '@chakra-ui/react'
const Nav = () => {
	const navigate = useNavigate();
	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);
	return (
		<nav >
			{
				<div>
				<NovuProvider
					subscriberId='63392236ee1316a5c8ae1b34'
					applicationIdentifier='c1lzpuEqD_hz'
				>
					<PopoverNotificationCenter
						onNotificationClick={onNotificationClick}
						colorScheme='green'
					>
						{({ unseenCount }) => (
							<NotificationBell unseenCount={unseenCount} />
						)}
					</PopoverNotificationCenter>
				</NovuProvider>
			</div>}
		</nav>
	);
};

export default Nav;