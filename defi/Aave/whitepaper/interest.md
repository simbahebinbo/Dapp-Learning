## 原理
「存入」、「取回」、「借出」、「偿还」、「利率调整」、「清算」这是触发DeFi借贷系统最主要的六项事件。
由于DeFi借贷系统基于去中心化的智能合约来运行，没有一个中心化的数据库来记录用户存入/取回/借出/偿还的时间，因此通常使用以太坊网络区块高度作为时间标记来更新一个资金池的利率指数Index，当「六项事件」中的任何一个事件触发时，该资金池的Index指数便会随之更新（Indexn = Indexn-1 * r），同时根据算法计算出系统动态的「存款利率」与「借款利率」，并更新相关的用户侧利息数据。

- 存入  

存款凭证通常以同质化代币的方式向DeFi存款用户发放，这里又有两种不同的设计方案，以Compound为代表的DeFi借贷系统发放与存款本息额等值的凭证代币cToken，通过凭证代币与基础存款资产的汇率升值的方式来支付利息，另一种是以AAVE为代表的DeFi借贷系统发放与存款本息额等量的凭证代币aToken，通过增加凭证代币数量的方式来支付利息。

- 清算

清算过程涉及到DeFi借贷系统中重要的概念，即账户的健康因子（又称：健康指数），前面有提过到存款权益的确权是基于凭证的，而健康因子则与账户的借款额、抵押物相关，具体用公式表述为：
健康因子 = ∑(抵押物*清算阈值)/(借款额+借款利息)

清算有两种常见的方式，一种是直接将借款人的部分抵押物以一定的折价通过合约挂单出售，允许任何用户代替借款人偿还债务后立即转售进行套利，另一种方式是从底价开始，以逐步加价的方式公开将抵押物进行拍卖。


**comp vs aave**  

让我们深入了解一下Compound和cTokens的机制。

一个用户向Compound存入10 ETH。为了换取10个ETH，Compound会发行cTokens，本例中是cETH。
用户将收到多少个cETH代币？这取决于该ETH市场当前的汇率。当创建一个新市场时，cTokens和基础代币之间的汇率被设置为0.02。这是一个任意数字，但我们可以假设每个市场的初始汇率为0.02，这个汇率只能随着每个Ethereum区块的增加而增加。

如果用户在市场刚刚创建时提供了10个ETH，他们将收到10/0.02=500个cETH。ETH市场已经运行了一段时间后，我们可以假设这个汇率已经比较高了，比如说是0.021。

这意味着用户将收到10/0.021=~476.19 cETH。如果用户决定立即赎回他们的ETH，他们应该收到与存入时大致相同的金额，也就是10 ETH左右。

用户的cETH只是另一个ERC20代币，它跟一般ERC20代币的主要区别是，从Compound赎回ETH必须使用cETH；最重要的是，cETH一直在积累利息，即使它从发起存款的原始钱包被发送到另一个钱包。

随着每个新的Ethereum区块出来，汇率都会增加。涨幅取决于存款APY，而APY是由存款/借款资金比例决定的。

在刚才例子中，假设从cETH到ETH的汇率随着每个区块增加0.0000000002。假设涨幅在一个月内保持不变，我们可以很容易地计算出这段时间内可以获得的利息。

假设平均每分钟有4个区块： 0.0000000002*4*60*24*30=0.00003456，把这个数字加上之前的汇率：0.021+0.00003456=0.02103456.

如果用户决定赎回ETH，他们将收到476.19*0.0213456=~10.0165 ETH。因此，用户在一个月内赚到了0.0165 ETH，约为0.16%的ETH回报。值得注意的是，用户最初收到的cETH数量没有变化，只是汇率的变化让用户兑换的ETH比最初存入的多。
Aave使用了类似的模式，每一个区块都会累积利息。主要区别在于，aToken的价值与基础代币的价值以1:1的比例挂钩。利息是通过不断增加钱包余额直接分配给aToken持有者的，aToken持有者也可以决定将利息支付流转到另一个Ethereum地址。

//todo
参考文档: https://docs.qq.com/doc/DQ2FwVkJlUlZRVERW  