function headerLoadIn(){
    return [
        {
            opacity: 0,
            transform: 'translateY(100px)'
        },
        {
            opacity: 0,
            offset: 0.5
        },
        {
            opacity: 1,
            offset: 0.97
        },
        {
            opacity: 1,
            transform: 'translateY(0px)'
        }
    ]
}

function slideFadeOut(direction){
    if(direction === 'right'){
        return [
            {
                opacity: 1,
                position: 'absolute',
                zIndex: '5'
            },
            {
                position: 'absolute',
                zIndex: '5',
                opacity: 0,
                transform: 'translateX(100%)'
            }
        ]
    } else {
        return [
            {
                opacity: 1
            },
            {
                opacity: 0,
                transform: 'translateX(-100px)'
            }
        ]
    }
}

function animateMenuOpen(){
    return [
        {
            opacity: 0,
            transform: 'translateY(0)',
        },
        {
            opacity: 1,
            transform: 'translateY(0)',
        }
    ]
}

function shine(){
    return [
        {
            left: '0%'
        },
        {
            left: '-200%'
        }
    ]
}

function rotator(){
    return [
        {
            transform: 'rotate(0deg)'
        },
        {
            transform: 'rotate(270deg)'
        }
    ]
}

function dash(){
    return [
        {
            strokeDashoffset: 280
        },
        {
            strokeDashoffset: 75,
            transform: 'rotate(135deg)',
            offset: 0.5
        },
        {
            strokeDashoffset: 280,
            transform: 'rotate(450deg)'
        }
    ]
}

function animateDrawOpen(){
    return [
        {
            opacity: 0,
            transform: 'translateX(0)'
        },
        {
            opacity: 1,
            transform: 'translateX(100%)'
        }
    ]
}

function appearDown(){
    return [
        {
            opacity: 0,
            marginTop: '-1rem'
        },
        {
            opacity: 1,
            marginTop: '0'
        }
    ]
}

function animateLocalization(){
    return [
        {
            opacity: 0,
            transform: 'translateY(0)'
        },
        {
            opacity: 1,
            transform: 'translateY(-1rem)'
        }
    ]
}

function myAnimation(){
    return [
        {
            opacity: 1
        },
        {
            opacity: 0.5,
            offset: 0.5
        },
        {
            display: 'none',
            opacity: 0
        }
    ]
}