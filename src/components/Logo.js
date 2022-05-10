const image_src = require("../images/ESG.png");

const Logo = () => {
    return (
        <section className="d-flex flex-row justify-content-center mt-4">
            <img src={image_src} alt="shap logo" height="300px" />
        </section>
    );
};

export default Logo;
