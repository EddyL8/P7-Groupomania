<template>
    <header>
        <div class="header-logo">
            <img src="/src/assets/icon-left-font-monochrome-white.png" 
            alt="Logo de l'entreprise groupomania" title=" logo groupomania" />
        </div>
    </header>
</template>

<style lang="scss">
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 25px 30px;
    background-color: #FD2D01;
}
.header-logo {
    display: flex;
    width: 100%;
    height: 100%;
}
.header-logo img {
    width: 20%;
    height: 60px;
    object-fit: cover;
}
</style>