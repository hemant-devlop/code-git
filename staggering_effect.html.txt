 .main{
            max-width: 300px;
            background-color: rgb(239, 239, 239);
            display: flex;
            justify-content: space-between  ;
            align-items: center;
        }
        .cir{
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 40px;
            background-color: rgb(0, 0, 0);
            border-radius: 50%;
            opacity: 0;
            animation: aaa 0.3s ease-in-out;
            animation-delay: calc(sibling-index()*0.2s);
            animation-fill-mode: forwards;
        
        }
        @keyframes aaa{
            0%{
                opacity:0;
                transform: translateY(-20px);
            }
            100%{
                opacity:1;
              transform: translateY(0);
            }   
        }