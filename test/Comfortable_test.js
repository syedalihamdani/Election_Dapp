const Comfortable = artifacts.require("Comfortable");
contract("Comfortable",accounts=>{
    it("Check name string",async ()=>{
        let check=await Comfortable.deployed();
        let name1=await check.name();
        assert.equal(name1,"Ali");
    })
    it("Check selfpay",async ()=>{
        let check=await Comfortable.deployed();
        await check.selfpay({value:1000});
    })
    it("Check name function string",async ()=>{
        let check=await Comfortable.deployed();
        let name2=await check.Showname();
        assert.equal(name2,"Ali");
    })
    it("Check string",async ()=>{
        let check=await Comfortable.deployed();
        let view1=await check.view1();
        assert.equal(view1,"hello to myself");
    })
    it("Check balance",async ()=>{
        let check=await Comfortable.deployed();
        let balance=await check.balance();
        assert.equal(balance,1000);
    })
    it("Check send function",async ()=>{
        let check=await Comfortable.deployed();
        let account1=accounts[3];
        await check.send(account1,{value:100});
    })
    it("Check event",async ()=>{
        let check=await Comfortable.deployed();
        await check.sevent();

    })
})