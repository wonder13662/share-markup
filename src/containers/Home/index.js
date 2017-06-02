import React, { Component } from 'react';
import { isNotMatched, hasNotEnoughCnt } from '../../util/checker';
import { InputMini } from '../../components/Detail/Input';
import { SliderMini } from '../../components/Detail/Slider';
import './Home.css';

class Home extends Component {

    render() {

        const list = [
            {
                link:'/detail/Input',
                name:'Input',
                myComponent:InputMini,
                props:{
                    min:4,
                    max:20,
                    regexExactLength:/[a-zA-Z0-9]/gi,
                    callback:(userInput) => {

                        if(hasNotEnoughCnt(userInput, /[a-zA-Z]/gi, 4)) {
                            return '영문이 4자 이상 포함되어야 합니다.';
                        }
                        if(hasNotEnoughCnt(userInput, /[0-9]/gi, 4)) {
                            return '숫자가 4자 이상 포함되어야 합니다.';
                        }

                        return '';
                    },
                },
            },
            {
                link:'/detail/Slider',
                name:'Slider',
                myComponent:SliderMini,
                props:{
                    min:10,
                    max:200,
                    right:30,
                    left:0,
                    step:5,
                    regexExactLength:null,
                    callback:(userInput) => {
                        console.log('userInput : ',userInput);
                        return '';
                    },
                },
            },
        ];

        return (
            <div className="flex-container">
                {list.map((element) => {

                    let CustomComponent = element.myComponent;

                    return (
                        <div className="flex-item" key={element.name}>
                            <CustomComponent {...element.props}/>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Home;