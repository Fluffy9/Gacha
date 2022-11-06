<template>
    <div :class="`capsule capsule-${rarity}${orientation ? '-' + orientation : ''} ${display ? 'capsule-display' : ''} d-inline-block`">
        <div class="outline text-primary position-absolute">
            <div class="shine d-none"></div>
        </div>
        <div class="inline-top text-primary position-absolute" >
            <!-- <b-avatar class="position-relative opacity-50" v-show="!orientation">❔</b-avatar> -->
        </div>

        <div class="inline-bottom text-primary position-absolute" >
        </div>
        <div class="inline-background text-primary position-absolute" >
        </div>
        <div class="fill text-primary position-absolute" >
        </div>
    </div>
</template>
<script>
export default {
    props: ["rarity", "orientation", "display"]
}
</script>
<style lang="scss" scoped>
    .capsule {
        position: relative;
        height: 100px;
        width: 100px
    }
    .capsule .b-avatar {
        box-shadow: 0 0 5px 10px #fab5e2;

    }
    .capsule-display {
        border: solid 5px white;
        height: 110px;
        width: 110px;
        border-radius: 100%;
        background-color: white;
        transform: rotate(-30deg);
    }
    .capsule-common .outline,
    .capsule-common-back .outline,
    .capsule-rare .outline,
    .capsule-rare-back .outline,
    .capsule-epic .outline,
    .capsule-epic-back .outline {
        border-radius: 100%; 
        border: solid 5px; 
        height: 100px; 
        width: 100px
    }

    .capsule-common .outline .shine,
    .capsule-rare .outline .shine,
    .capsule-epic .outline .shine {
        height: 25%;
        width: 25%;
        margin: 5% auto;
        border-top: dotted 10px white;
        border-radius: 50%;
        transform: rotate(30deg) translate(15px);
    }

    .capsule-common .inline-top, 
    .capsule-rare .inline-top, 
    .capsule-epic .inline-top {
        border-radius: 50% / 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;        
        border: 5px solid;
        border-bottom: 0;
        height: 25px; 
        width: 100px; 
        top: 25px; 
        opacity: .5;
        z-index: -1;
        backdrop-filter: blur(5px);
    }

    .capsule-common-back .inline-top, 
    .capsule-rare-back .inline-top, 
    .capsule-epic-back .inline-top {
        border-radius: 50% / 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;        
        border: 5px solid;
        border-bottom: 0;
        height: 25px; 
        width: 100px; 
        top: 25px; 
        z-index: -1;
    }
    
    .capsule-common .inline-bottom, 
    .capsule-rare .inline-bottom, 
    .capsule-epic .inline-bottom {
        // https://stackoverflow.com/questions/17595147/semi-oval-with-css
        border-radius: 50% / 100%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;        
        border: 5px solid;
        border-top: 0;
        height: 25px; 
        width: 100px; 
        top: 50px; 
    }
    .capsule-epic .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #41fbee;
        opacity: .25;
        z-index: -2
    }

    .capsule-epic-back .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #41fbee;
        z-index: -2
    }

    .capsule-rare .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #fab5e2;
        opacity: .25;
        z-index: -2
    }

    .capsule-rare-back .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #fab5e2;
        z-index: -2
    }

    .capsule-common .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #9fe8ff;
        opacity: .25;
        z-index: -2
    }

    .capsule-common-back .inline-background {
        border-radius: 100%; 
        height: 50px; 
        width: 100px; 
        top: 25px; 
        background-color: #9fe8ff;
        z-index: -2
    }

    .capsule-epic .fill, .capsule-epic-back .fill {
        //https://stackoverflow.com/questions/64073196/why-does-border-left-influence-the-shape-of-ellipse-in-css
        height: 100px; 
        width: 100px; 
        border-radius: 50%;
        border-bottom: 30px solid #41fbee;
        margin-bottom: 100px;
        background-color: rgba(255, 255, 255, 0.15);
        z-index: -2;
    }

    .capsule-rare .fill, .capsule-rare-back .fill {
        //https://stackoverflow.com/questions/64073196/why-does-border-left-influence-the-shape-of-ellipse-in-css
        height: 100px; 
        width: 100px; 
        border-radius: 50%;
        border-bottom: 30px solid #fab5e2;
        margin-bottom: 100px;
        background-color:  rgba(255, 255, 255, 0.15);
        z-index: -2;
    }

    .capsule-common .fill, .capsule-common-back .fill {
        //https://stackoverflow.com/questions/64073196/why-does-border-left-influence-the-shape-of-ellipse-in-css
        height: 100px; 
        width: 100px; 
        border-radius: 50%;
        border-bottom: 30px solid #9fe8ff;
        margin-bottom: 100px;
        background-color:  rgba(255, 255, 255, 0.15);;
        z-index: -2;
    }
</style>