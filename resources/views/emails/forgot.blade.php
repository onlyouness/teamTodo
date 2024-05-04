@component('mail::message')
    <p>Hello {{$user->name}}</p>
    @component('mail::button', ["url" => "http://localhost:3000/api/reset/" . $user->remember_token])   
    Reset Your Password
    @endcomponent
    <p>In Case You Have Any Issues Recovering Your Password, Please Contact Us.</p>
    Thnks <br/>
    {{config('app.name')}}

    @endcomponent