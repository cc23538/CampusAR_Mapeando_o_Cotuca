const gravity = 0.6

const floorHeight = 0 // altura do chão, de acordo com a imagem de fundo

const backgroundSpritePath = "background.png"
const defaultObjectSpritePath = "objects\square-svgrepo-com.svg"

class Sprite{
    constructor({position, velocity, source, scale, offset, sprites}){
        this.position = position
        this.velocity = velocity
        this.scale = scale || 1
        this.image = new Image()
        this.image.src = source || defaultObjectSpritePath

        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale

        this.offset = offset || {
            x:0,
            y:0
        }

        this.sprites = sprites || {
            idle: {
                src: this.image.src,
                totalSpriteFrames: 1,
                framesPreSpriteFrame: 1,
            }
        }

        this.currentSprite = this.sprites.idle

        this.elapsedTime = 0
        this.currentSpriteFrame = 0
        this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames
        this.framesPreSpriteFrame = this.sprites.idle.framesPerSpriteFrame
    }

    setSprite(sprite){
        this.currentSprite = this.sprites[sprite]

        if(!this.currentSprite){
            this.currentSprite= this.sprites.idle
        }
    }

    loadSprite(){
        let previousSprite = this.image.src

        this.image = new Image()
        this.image.src = this.currentSprite.src
        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale

        this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
        this.framesPreSpriteFrame = this.currentSprite.framesPerSpriteFrame

        let newSprite = this.image.src

        if(previousSprite != newSprite){
            let previousSpriteImege = new Image()
            previousSpriteImege.src = previousSprite

            this.position.y += (previousSpriteImege.height - this.image.height) * this.scale
        }
    }

    draw(){ 
        ctx.imageSmoothingEnabled = false

        const xScale = this.facing == "left" ? -1 : 1

        ctx.save()
        ctx.translate(this.position.x + this.offset.x, this.position.y + this.offset.y)
        ctx.scale(xScale, 1)
        
        ctx.drawImage(
            this.image,
            this.currentSpriteFrame * this.image.width / this.totalSpriteFrames,
            0,
            this.image.width / this.totalSpriteFrames,
            this.image.height,
            0,
            0,
            this.width / this.totalSpriteFrames,
            this.height,
        )

        ctx.restore()
        
    }

    animate(){
        this.elapsedTime++

        if (this.elapsedTime >= this.framesPreSpriteFrame){
            this.currentSpriteFrame++
            
            if(this.currentSpriteFrame >= this.totalSpriteFrames){
                this.currentSpriteFrame = 0
            }
            this.elapsedTime = 0
        }
    }

    update(){
        this.draw()
        this.animate()
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        sprites,
        scale

    }){
        super({
            position,
            velocity,
            scale,
            sprites   
        })
        this.velocity = velocity

        this.isAttacking
        this.attackCooldown = 500
        this.onAttckCooldown

        this.lastKeyPressed
        this.onGround //verifica se o player está ou não no chão
    }

    gravity(){
        if(Math.ceil(this.position.y + this.height >= canvas.height - floorHeight)){
            this.onGround = true
        }else{
            this.onGround = false
        }

        if(this.position.y + this.height > canvas.height - floorHeight){
            this.position.y= canvas.height- this.height - floorHeight
            this.velocity.y = 0
        }else{
            if (!this.onGround) this.velocity.y += gravity
        }
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    update(){
        this.gravity()
        this.loadSprite()

        this.draw()
        this.animate()
    }

    attack(){
        if(this.onAttckCooldown) return
        this.isAttacking = true
        this.onAttckCooldown = true

        setTimeout(() =>{
            this.isAttacking = false
        }, 100)

        setTimeout(()=>{
            this.onAttckCooldown = false
        }, this.attackCooldown)
    }

    jump(){
        if(!this.onGround) return
        this.velocity.y = -16
    }
}


const player = new Fighter({
    position: {
        x:100,
        y:0
    },

    velocity: {
        x:0,
        y:10
    },
    scale: 2.5,
    sprites: {
        idle:{
            src:"Idle.png",
            totalSpriteFrames: 6,
            framesPerSpriteFrame: 14,
        },
        running:{
            src:"Run.png",
            totalSpriteFrames: 7,
            framesPerSpriteFrame: 14,
        },
        jumping:{
            src:"Jump.png",
            totalSpriteFrames: 6,
            framesPerSpriteFrame: 14,
        },
        attacking:{
            src:"Attack_4.png",
            totalSpriteFrames: 5,
            framesPerSpriteFrame: 8,
        },
    }
    
})

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    source: backgroundSpritePath
})