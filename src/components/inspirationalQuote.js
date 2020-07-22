import React from 'react';
// @ts-ignore



class InspirationQuote extends React.Component {

    state = {
        quote: null
    }

    componentDidMount() {
        import('inspirational-quotes').then(
            (Quotes) => this.setState({ quote: Quotes.getRandomQuote() })
        ).catch(() => console.log("Couldnt load quotes"));

    }


    render() {
        const { quote } = this.state;
        // @ts-ignore
        return (
            <>
                {
                    quote ? (
                        <figure>
                            <blockquote>{quote.text}</blockquote>
                            <figcaption><cite>{quote.author}</cite></figcaption>
                        </figure>)
                        :
                        "..."

                }

            </>
        )
    }

};

export default InspirationQuote;