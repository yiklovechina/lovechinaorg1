


lovechinabytype (GET) TYPE 
lovechinabyname (GET) NAME 
lovechinabyXY (GET) X , Y  & type (All,other)
lovehkbytype (GET) TYPE 
lovehkbyname (GET) Name 
lovehkXY (GET) X,Y  & type (All,other)
(status:T)才會Display
{
    "result":[
        {
            "name" : String
            "address" : String
            "type" : String
            "evidence": Array [String,String]
            "X": Number
            "Y":Number
            "description": Array [String,String]
        },
        ....
    ]
}


//address need geoapi
lovechinainsert (POST) , name, address , type, evidence, X, Y, description
lovehkinsert (POST) , name, address , type, evidence, X, Y, description

=> Status:200OK [Message:Successful]


Viewchinabyadmin (POST) user+pass
Viewhkbyadmin   (POST) user + pass
(status:F)才會Dispaly

{
    "result":[
        {
            "name" : String
            "address" : String
            "type" : String
            "evidence": Array [String,String]
            "X": Number
            "Y":Numbergi
            "description": Array [String,String]
        },
        ....
    ]
}

updatechinabyadmin (PUT) user + pass + name + X + Y
updatehkbyadmin (PUT) user + pass + name + X + Y
(status:"F"  => status: "T")

{
    "n": 1,         (如find唔到result 這裡是0)
    "nModified": 1, (如有update 迢裡變1)
    "ok": 1
}


delchinabyadmin(DELETE)  user + pass + name + X + Y
delhkbyadmin(DELETE) user + pass + name + X + Y
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1 (如字面解釋)
}


/type - GET Method //noneed user format = 
{
    "type":[
        
    ]
}
/type - put //need user
/type - del //need user





***Let's go Android part ***


