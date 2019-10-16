import React from 'react';
import { View, ViewContent, ContentTitle, Content } from '../../styles/UI.style';
import ContentLoader from '../../components/Loader';
import CurrentLanguage from '../../helpers/CurrentLanguage';

export default class ViewCars extends React.Component {

    state = {
        isLoading: false
    }

    render() {
        return <View>
            { this.state.isLoading && <ContentLoader /> || <ViewContent>
            
            <ContentTitle>
                { CurrentLanguage().views.settings.cars.txtTitle }
            </ContentTitle>
            <Content>
                
            </Content>
            </ViewContent>}
        </View>
    }
}