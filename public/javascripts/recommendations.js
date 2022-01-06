function check()
{

//INVESTMENT PRODUCTS
    //GIC
    var GIC ="<h2>Recommended Product:</h2><h3>GICs</h3><p>Guaranteed investment certificates are low risk and provide a steady rate of return,GICs are a basic investment type in a diversified portfolio that typically offer fixed terms and fixed, guaranteed returns.</p><hr><ul><li> <b>Great for:</b> Investors who want to protect their principle while earning</li> <li>Your initial investment is 100% guaranteed</li> <li>Choose a GIC to suit your needs.</li></ul><a href='/Tutorial'>Click Here to Learn More</a>"
    //BONDS
    var bonds = "<h2>Recommended Product:</h2><h3>Bonds</h3><p>Bonds are a fixed income investment that are typically issued by the government or businesses. Your investment acts as a loan that is then paid back in regular increments –plus interest—over the course of your investment term.</p><hr><ul><li> <b>Great for:</b> Investors who want regular payments and principal protection.</li> <li>A variety of options from corporations and government issuers</li> <li>Regular interest payments on your investments.</li></ul><a href='/Tutorial'>Click Here to Learn More</a>"
    //Mutual Funds
    var MutualFund = "<h2>Recommended Product:</h2><h3>Mutual Funds</h3><p>A mutual fund is a type of investment that pools your money with that of other investors to buy a portfolio of individual investments overseen by a professional portfolio manager.</p><hr><ul><li> <b>Great for:</b> Investors who want diversification and assets managed by professionals.</li> <li>Diversified, cost-efficient and professionally managed</li> <li>Available for all account types including RRSP, RESP, RRIF, TFSA and more</li></ul><a href='/Tutorial'>Click Here to Learn More</a>"
    //ETF
    var etf = "<h2>Recommended Product:</h2><h3>ETFs</h3><p>Exchange traded funds are hybrid, low-cost investments combining the advantages of both traditional stocks and mutual funds. Think of ETFs as baskets of securities made up of equities, fixed income and other assets.</p><hr><ul><li> <b>Great for:</b> Investors who want diversified, low-fee investments.</li><li>Flexible trading – just like stocks</li> <li>A wide selection of commission-free options</li></ul><a href='/Tutorial'>Click Here to Learn More</a>"
    //Stocks
    var stock = "<h2>Recommended Product:</h2><h3>Stocks</h3><p>When people think of online trading, they think of buying and selling stocks (also referred to as equities), which are units of ownership in a public corporation. You own shares in a given company, giving you a claim on their assets and future earnings.</p><hr><ul><li> <b>Great for:</b> Investors who want to own shares in particular companies.</li> <li>You have the potential to earn capital gains on stock price increases</li> <li>Enjoy voting rights in corporations you invest in</li></ul><a href='/Tutorial'>Click Here to Learn More</a>"


//QUESTIONS:
    //how much to invest?
    var range = document.recommendForm.Amount.value; //low,mid,high,higher
    var experience = document.recommendForm.experience.value; //values: None,Beginner,Experienced
    var time = document.recommendForm.time.value; //short,medium,long

    //Risk Level
    var lowRisk = document.querySelector('input[value="low"]');
    var mediumRisk = document.querySelector('input[value="medium"]');
    var highRisk = document.querySelector('input[value="high"]');
    
//RECOMMENTATIONS: 
//------------------------------------------------------------------------------------
    //BONDS
    if ((lowRisk.checked || mediumRisk.checked) && (time =='medium' || time =='long') && (experience == 'Experienced')&& (range == 'higher' || range == 'high')){
        document.getElementById('recommend').innerHTML = bonds;
        reveal();
    } 
    //Mutual Funds
   else if ((lowRisk.checked || mediumRisk.checked || highRisk.checked) && (time =='medium'||time =='long') && (range == 'low' || range == 'mid') && (experience == 'Experienced')){
    document.getElementById('recommend').innerHTML = MutualFund;
    reveal();
    }   
    
    //Stocks
    else if ((mediumRisk.checked && highRisk.checked) && (time =='medium'||time =='long') && (range =='low')){
        document.getElementById('recommend').innerHTML = stock;
        reveal();
    } 
    //GIC
    else if ((lowRisk.checked) && (time =='short') && (experience == 'Beginner' || experience =='None')){
        document.getElementById('recommend').innerHTML = GIC;
        reveal();
    }     

    //EFT
    else if ((mediumRisk.checked) &&(time =='long') && (range == 'low') && (experience == 'Beginner')){
        document.getElementById('recommend').innerHTML = etf;
        reveal();
    }     
    else{
          alert("No Matches were found! Please try again!");
    } 
}


//this function is to reveal the content
function reveal(){
    var Reveal = document.getElementById('recommend');
    Reveal.style.display ="block";
}




