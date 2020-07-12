<?php

namespace App\Http\Controllers;

use App\Car;
use App\Immobilier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(\App\Categorie $categorie)
    {
        $marques = DB::table('marques')->where('categorie_id',$categorie->id)->get();
        if(Car::count()!=0){

            $cars_s = array();
            foreach( $marques as $marque){
                $cars = DB::table('cars')->where('marque_id',$marque->id)
                ->join('marques','marque_id','=','marques.id')
                ->join('categories','categories.id','=','marques.categorie_id')
                ->join('etats','etat_id','=','etats.id')
                ->get();
                $cars_arr = $cars->toArray();
                $cars_s = array_merge($cars_s , $cars_arr);
            }
            return view('cars.index',compact('cars_s'));
        }
    }

    /*
     public function index(\App\User $user)
    {
        return view('profiles.index',compact('user'));
    }
     */




    /**
     * Display the specified resource.
     *
     * @param  \App\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view('cars.details');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('cars.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        $data= request()->validate([
            'categorie' => 'required',
            'marque' => 'required',
            'etat' => 'required',
            'numm_immat' => 'required',
            'nbr_place' => ['required','integer'],
            'kilometrage' => ['required','numeric'],
            'prix_min' => ['required','numeric'],
            'prix_max' => ['required','numeric'],
            'chare_max' => ['required','numeric'],
            'couleur' => 'required',
            'pic_src' => ['required','image'],
            'img_1' => ['required','image'],
            'img_2' => ['required','image'],
            'img_3' => ['required','image'],
            'img_4' => ['required','image'],
         ]);

        $imgpath_1 = request('pic_src')->store('uploads-mx', 'public');
        $imgpath_2 = request('img_1')->store('uploads-mx', 'public');
        $imgpath_3 = request('img_2')->store('uploads-mx', 'public');
        $imgpath_4 = request('img_3')->store('uploads-mx', 'public');
        $imgpath_5 = request('img_4')->store('uploads-mx', 'public');

        $id_etat = DB::table('etats')->insertGetId(
            ['description' => $data['etat']],
        );
        $id_categorie = DB::table('categories')->where('designation',$data['categorie'])->get();
        $id_marque = DB::table('marques')->insertGetId(
            ['categorie_id' => $id_categorie[0]->id,'libelle' => $data['marque']],
        );
        $id_car = DB::table('cars')->insertGetId(
            [
                'etat_id' => $id_etat ,
                'marque_id' => $id_marque,
                'numm_immatric' => $data['numm_immat'],
                'date_mise_service' => date("y-m-d h:i:s"),
                'kilometrage' => $data['kilometrage'],
                'nbr_place' => $data['nbr_place'],
                'prix_min_per_day' => $data['prix_min'],
                'prix_max_per_day' => $data['prix_max'],
                'couleur' => $data['couleur'],
                'charge_max' => $data['chare_max'],
                'deleted' => 0 ,
                'pic_src' => $imgpath_1 ,
            ],
        );
        $id_gall_car = DB::table('gallery_cars')->insertGetId(
            [
                'car_id' => $id_car ,
                'first_img' => $imgpath_2 ,
                'sec_img' => $imgpath_3 ,
                'third_img' => $imgpath_4 ,
                'fourth_img' => $imgpath_5 ,
            ],
        );


         return redirect()->route('car.index',['categorie' => $id_categorie[0]->id]);
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Car $car)
    {
        //
    }
}
