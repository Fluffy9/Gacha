<template>
    <div style="margin: -50">
        <div class="d-inline-block" style="min-height: 400px;">
            <div id="machine" class="position-relative">
                <capsule v-for="i in n*n" :key="`capsule-${i}`" :id="`capsule-${i}`" :rarity="['common','rare','epic'][Math.floor(Math.random() * 3)]" :orientation="['back',''][Math.floor(Math.random() * 2)]"></capsule>

                <!-- <capsule v-for="i in n" :key="`capsule-${i+0}`" :id="`capsule-${i+0}`" rarity="epic"></capsule>
                <capsule v-for="i in n" :key="`capsule-${i+n}`" :id="`capsule-${i+6}`" rarity="rare" orientation="back"></capsule>
                <capsule v-for="i in n" :key="`capsule-${i+n*2}`" :id="`capsule-${i+12}`" rarity="rare"></capsule>
                <capsule v-for="i in n" :key="`capsule-${i+n*3}`" :id="`capsule-${i+18}`" rarity="common" orientation="back"></capsule>
                <capsule v-for="i in n" :key="`capsule-${i+n*4}`" :id="`capsule-${i+24}`" rarity="common"></capsule> -->
                <!-- <capsule v-for="i in 6" :key="`capsule-${i+30}`" :id="`capsule-${i+30}`" rarity="epic" orientation="back"></capsule> -->
            </div>
            <div id="machine-debug" :class="`position-relative`" :style="`${debug ? 'opacity:1' : 'opacity:0'}`">
            </div>
        </div>
    </div>
</template>
<script>
import Matter from 'matter-js'
import Capsule from '@/components/Capsule.vue'
export default {
    props: ["debug", "n", "radius"],
    components: {
        Capsule
    },
    methods: {

    },
    mounted(){
        let radius = this.radius
        // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies;

        var engine = Engine.create(),
        world = engine.world;
            // create renderer
        let width = document.getElementById('machine-debug').getBoundingClientRect().width || 800;
        let height = document.getElementById('machine-debug').getBoundingClientRect().height || 600;
        var render = Render.create({
            element: document.getElementById("machine-debug"),
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframeBackground: '#222',
                hasBounds: false,
                enabled: true,
                wireframes: true,
                showSleeping: true,
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showAxes: false,
                showPositions: false,
                showIds: false,
                showShadows: false,
                showAngleIndicator: true,
            }
        });

        Render.run(render);
        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        
        let walls = [
            Bodies.rectangle(width/2, -25, width, 50, { isStatic: true }),
            Bodies.rectangle(width/2, height+25, width, 50, { isStatic: true }),
            Bodies.rectangle(width+25, height/2, 50, height, { isStatic: true }),
            Bodies.rectangle(-25, height/2, 50, height, { isStatic: true })
        ]        
        Composite.add(engine.world, walls);
        Engine.run(engine);

        let capsules = document.querySelectorAll('.capsule');
        let i = 0; 
        let stack = Composites.stack(this.n, this.n, this.n, 5, 0, 0, function(x, y) {
            // just a little bit of overlap looks good
            let body = Bodies.circle(x,y,radius-1)
            capsules[i].id = body.id;
            i++
            return body
        })

        Composite.add(world, stack);

        let mouse = Mouse.create(render.canvas)
        let mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        window.requestAnimationFrame(update);
        function update() {
            stack.bodies.map(body => {
                let capsule = document.getElementById(body.id)
                if(!capsule) return
                capsule.style.transform = `rotate(${body.angle}rad) scale(${radius/50})`
                capsule.style.position = 'absolute'
                capsule.style.left = `${body.position.x-radius}px`;
                capsule.style.top = `${body.position.y-radius}px`;
            })                
            
            window.requestAnimationFrame(update);
        }
    }
}
</script>
