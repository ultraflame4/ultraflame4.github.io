<script lang="ts" setup>
import FakeTerminal, { tti, tti_delay, tti_prompt, type TerminalTextInstruction } from './FakeTerminal.vue';


const helloWorld =`
██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ ██╗
██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗██║
███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║╚═╝
██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝██╗
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝
                                                                                           
`

const terminalInstructions: TerminalTextInstruction[] = [
    `Arch Linux v2025.02.01 / Kernel v6.12.10`,
    `${window.navigator.userAgent}\n`,
    tti_prompt("Login: ", "ultr42"),
    tti_prompt("Password: ", "*****\n"),
    tti_delay(25),
    tti("Password incorrect!"),
    tti_delay(25),
    tti_prompt("Password: ", "********\n"),
    tti_delay(25),
    tti(`Logged in as user ultr42`),
    tti_delay(10),
    tti(`Current system time, ${new Date()}`),
    tti_delay(10),
    tti(`\n[Notice!] 1 failed login attempt since last login!\n`),
    tti_prompt("~ $ ", "cd ultr42.dev/"),
    tti_prompt("~/ultr42.dev $ ", "sudo ./start"),
    tti_prompt("Password: ", "********\n"),
    tti_delay(10),
    tti("Starting in ...3"),
    tti_delay(10),
    tti("Starting in ...2"),
    tti_delay(10),
    tti("Starting in ...1"),
    tti_delay(10),
    tti("Starting in ...0"),
    tti_delay(10),
    tti("Starting super awesome program! Prepare for awesomeness. 🎉🎉🎉🎉🎉"),
    tti(helloWorld),
    tti_delay(100),
    tti("Ok now, you can scroll down."),
    tti_delay(200),
    tti("Come on, scroll down, theres more stuff below."),
    tti_delay(300),
    tti("Why are you still here, scroll down, please."),
    tti_delay(400),
    tti("Seriously theres, scroll down."),
    tti_delay(500),
    tti("Ok whatever you can stay here if you like...."),
    
]

</script>
<template>
    <FakeTerminal :sequence="terminalInstructions">

    </FakeTerminal>
</template>