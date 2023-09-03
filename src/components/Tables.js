// import React from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// function Tables() {
//   return (
//     <div>
//       <div class="tableWrapper scrollable" style={{width:"100%"}}>
//                   <table class="thead2 table  left makeExpandableTable makeFixedTable" cellpadding="3" cellspacing="0" border="1" rules="all">
//                      <colgroup class="std">
//                         <col width="25%"/>
//                         <col width="12.5%"/>
//                         <col width="12.5%"/>
//                         <col width="12.5%"/>
//                         <col width="12.5%"/>
//                         <col width="25%"/>
//                      </colgroup>
//                      <thead><tr>
//                            <td style={{backgroundColor: "DarkGray", colspan: "6"}} class="hasbgcenter  top ">
//                               <span class="bold">Table 2-2<br/>Development Standards for Residential Zones</span>
//                               </td>
//                         </tr><tr>
//                            <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold">Development<br/>Feature</span>
//                               <br/>
//                               (minimum unless
//                               <br/>
//                               otherwise indicated)
//                               </td>
//                               <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold"><em class="hit hlt1">R-LD</em></span>
//                               </td>
//                               <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold"><em class="hit hlt4">R-MD</em></span>
//                               </td>
//                               <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold"><em class="hit hlt4">R-HD</em></span>
//                               </td>
//                               <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold"><em class="hit hlt4">R-UHD</em></span>
//                               </td>
//                               <td style={{backgroundColor: "LightGray"}} class="hasbgcenter  top ">
//                               <span class="bold">Additional<br/>Requirements</span>
//                               </td>
//                         </tr></thead><tbody>
                        
                        
//                         <tr>
//                            <td colspan="6" class="left  top ">
//                               <span class="bold">Parcel Dimensions -</span> Minimum dimensions required for each NEWLY CREATED parcel.
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Parcel Area</span>
//                               </td>
//                            <td class="center  top ">
//                               5,000
//                               <br/>
//                               sq. ft.
//                               </td>
//                            <td class="center  top ">
//                               5,000
//                               <br/>
//                               sq. ft.
//                               </td>
//                            <td class="center  top ">
//                               12,000
//                               <br/>
//                               sq. ft.
//                               </td>
//                            <td class="center  top ">
//                               12,000
//                               <br/>
//                               sq. ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Parcel Width</span>
//                               </td>
//                            <td class="center  top ">
//                               50 ft.
//                               </td>
//                            <td class="center  top ">
//                               50 ft.
//                               </td>
//                            <td class="center  top ">
//                               50 ft.
//                               </td>
//                            <td class="center  top ">
//                               50 ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Parcel Depth</span>
//                               </td>
//                            <td class=" top "></td>
//                            <td class="center  top ">
//                               100 ft.
//                               </td>
//                            <td class="center  top ">
//                               240 ft.
//                               </td>
//                            <td class="center  top ">
//                               240 ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td rowspan="2" colspan="1" class=" top ">
//                               <span class="bold">Density/Intensity</span>
//                               </td>
//                            <td rowspan="2" class="center  top ">
//                               0 to 12
//                               <br/>
//                               du/acre
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-MD-1:</span>
//                               <br/>
//                               12 to 15
//                               <br/>
//                               du/acre
//                               </td>
//                            <td rowspan="2" class="center  top ">
//                               22 to 43
//                               <br/>
//                               du/acre
//                               </td>
//                            <td rowspan="2" class="center  top ">
//                               43 to 86
//                               <br/>
//                               du/acre
//                               </td>
//                            <td rowspan="2" class=" top ">
//                                
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-MD-2:</span>
//                               <br/>
//                               12 to 22
//                               <br/>
//                               du/acre
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Setbacks</span>
//                               <sup>
//                                  1 and 2
//                                  </sup>
//                               </td>
//                            <td colspan="5" class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Front</span>
//                               <br/>
//                               Living Area
//                               <br/>
//                               Garage Face
//                               </td>
//                            <td class="center  top ">
//                                
//                               <br/>
//                               10 ft.
//                               <br/>
//                               23 ft.
//                               </td>
//                            <td class=" top ">
//                                
//                               <br/>
//                               20 ft.
//                               <br/>
//                                
//                               </td>
//                            <td class=" top ">
//                                
//                               <br/>
//                               15 ft.
//                               <br/>
//                                
//                               </td>
//                            <td class="center  top ">
//                                
//                               <br/>
//                               20 ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Corner Vision<br/>Triangle</span>
//                               </td>
//                            <td class="center  top ">
//                               12 ft.
//                               </td>
//                            <td class="center  top ">
//                               12 ft.
//                               </td>
//                            <td class="center  top ">
//                               12 ft.
//                               </td>
//                            <td class="center  top ">
//                               12 ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Side/Street Side</span>
//                               </td>
//                            <td class="center  top ">
//                               5 ft.
//                               </td>
//                            <td class="center  top ">
//                               10 ft.
//                               </td>
//                            <td class="center  top ">
//                               10 ft./15 ft.
//                               </td>
//                            <td class="center  top ">
//                               10 ft./15 ft.
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td style={{fontSize: "7pt"}} class="left  top ">
//                               <span class="bold">Rear</span>
//                               <br/>
//                               1
//                               <sup>
//                                  st
//                                  </sup>
//                               Story
//                               <br/>
//                               2
//                               <sup>
//                                  nd
//                                  </sup>
//                               Story
//                               <br/>
//                               (see footnote 1 for structures above 18 feet)
//                               </td>
//                            <td class="center  top ">
//                                
//                               <br/>
//                               10 ft.
//                               <br/>
//                               10 ft.
//                               </td>
//                            <td class=" top ">
//                                
//                               <br/>
//                               20 ft.
//                               <br/>
//                               30 ft.
//                               </td>
//                            <td class="center  top ">
//                                
//                               <br/>
//                               20 ft.
//                               </td>
//                            <td class="center  top ">
//                                
//                               <br/>
//                               20 ft.
//                               </td>
//                            <td class="left  top ">
//                               <em class="hit hlt1">R-LD</em> zone: The 10-foot rear setback requires a minimum of 750 sq. ft. of usable rear
//                               yard area; if not, development is not allowed.
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Site Coverage</span>
//                               </td>
//                            <td class="center  top ">
//                               50%
//                               </td>
//                            <td class="center  top ">
//                               60%
//                               </td>
//                            <td class="center  top ">
//                               70%
//                               </td>
//                            <td class="center  top ">
//                               70%
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Floor Area Ratio</span>
//                               </td>
//                            <td class="center  top ">
//                               .55
//                               </td>
//                            <td class="center  top ">
//                               .65
//                               </td>
//                            <td class="center  top ">
//                               __
//                               </td>
//                            <td class="center  top ">
//                               __
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td rowspan="2" colspan="1" class=" top ">
//                               <span class="bold">Height</span>
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold">Dwelling:</span>
//                               <br/>
//                               2 stories or
//                               <br/>
//                               26 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-MD-1:</span>
//                               <br/>
//                               2½ stories
//                               <br/>
//                               or 30 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-HD-3:</span>
//                               <br/>
//                               3 stories
//                               <br/>
//                               or 36 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                            <td rowspan="2" class="center  top ">
//                               7 stories
//                               <br/>
//                               or 75 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                            <td rowspan="2" class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class="center  top ">
//                               <span class="bold">Accessory<br/>Structure:</span>
//                               <br/>
//                               15 ft.
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-MD-2:</span>
//                               <br/>
//                               3 stories
//                               <br/>
//                               or 36 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                            <td class="center  top ">
//                               <span class="bold"><em class="hit hlt4">R</em>-HD-5:</span>
//                               <br/>
//                               5 stories
//                               <br/>
//                               or 60 ft.,
//                               <br/>
//                               whichever
//                               <br/>
//                               is greater
//                               </td>
//                         </tr>
//                         <tr>
//                            <td colspan="6" class="left  top ">
//                               <span class="bold">Open Space -</span> Minimum sq. ft. of open space required for each dwelling unit. All open space areas
//                               shall be landscaped in compliance with<a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.28TRPRPR" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.28TRPRPR" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.28</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top "></td>
//                            <td class="center  top ">
//                               750 sq. ft.
//                               <br/>
//                               in rear of
//                               <br/>
//                               property,
//                               <br/>
//                               usable and
//                               <br/>
//                               open, no
//                               <br/>
//                               permanent
//                               <br/>
//                               hardscape
//                               </td>
//                            <td class=" top "></td>
//                            <td class=" top "></td>
//                            <td class=" top "></td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class="left  top ">
//                               Common Open Space
//                               <br/>
//                                
//                               <br/>
//                               Must be usable
//                               <br/>
//                               and provide
//                               <br/>
//                               amenities.
//                               <br/>
//                                
//                               <br/>
//                               Setbacks may
//                               <br/>
//                               count toward
//                               <br/>
//                               open space
//                               <br/>
//                               requirement if
//                               <br/>
//                               all provisions
//                               <br/>
//                               are met.
//                               </td>
//                            <td class="center  top ">
//                               N/A
//                               </td>
//                            <td class="center  top ">
//                               250 sq. ft.
//                               <br/>
//                               (minimum
//                               <br/>
//                               dimension
//                               <br/>
//                               [length/width]
//                               <br/>
//                               shall be
//                               <br/>
//                               15 feet)
//                               </td>
//                            <td class="center  top ">
//                               100 sq. ft.
//                               <br/>
//                               (minimum
//                               <br/>
//                               dimension
//                               <br/>
//                               [length/width]
//                               <br/>
//                               shall be
//                               <br/>
//                               six feet)
//                               </td>
//                            <td class="center  top ">
//                               50 sq. ft.
//                               <br/>
//                               (minimum
//                               <br/>
//                               dimension
//                               <br/>
//                               [length/width]
//                               <br/>
//                               shall be
//                               <br/>
//                               six feet)
//                               </td>
//                            <td class="left  top ">
//                               Common and Private Open Space may be aggregated on a parcel in <em class="hit hlt4">R</em>-MD, <em class="hit hlt4">R</em>-HD and <em class="hit hlt4">R</em>-UHD
//                               zones; (minimum dimension [length/width] shall be 20 feet). Aggregation of open space
//                               shall be done in accordance with<a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART5SU" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART5SU" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Article 5</a> (Subdivisions)<a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART5SU_CH18.62DELAPAREPU" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART5SU_CH18.62DELAPAREPU" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.62</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td colspan="6" class="left  top ">
//                               Private Open Space
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               Ground Floor
//                               <br/>
//                               Units
//                               </td>
//                            <td class="center  top ">
//                               N/A
//                               </td>
//                            <td class="center  top ">
//                               200 sq. ft. (The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class="center  top ">
//                               50-100 sq. ft. (The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class="center  top ">
//                               50 sq. ft. (The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               Upper Floor
//                               <br/>
//                               Units
//                               </td>
//                            <td class="center  top ">
//                               N/A
//                               </td>
//                            <td class="center  top ">
//                               100 sq. ft. (The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class="center  top ">
//                               50 sq. ft.(The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class="center  top ">
//                               50 sq. ft. (The minimum dimension [length/width] shall be six feet)
//                               </td>
//                            <td class=" top "></td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Fencing</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.26FEHEWA" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.26FEHEWA" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.26</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Landscaping</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.28TRPRPR" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.28TRPRPR" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.28</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Lighting</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.34PEST_18.34.110OULIGL" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.34PEST_18.34.110OULIGL" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Section 18.34.110</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Parking</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.30OREPALO" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.30OREPALO" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.30</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Satellite Antennae</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.42WICOFA" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.42WICOFA" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.42</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Signs</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               <a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.32SI" data-chunk-id="EAPAALDECO2018EDCUORNO02-2022ADMA32022_TIT18DECO_ART3REAPALZO_CH18.32SI" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 18.32</a>
//                               </td>
//                         </tr>
//                         <tr>
//                            <td class=" top ">
//                               <span class="bold">Water Efficient<br/>Landscape</span>
//                               </td>
//                            <td colspan="5" class="left  top ">
//                               Municipal Code<a href="https://library.municode.com/ca/east_palo_alto/codes/code_of_ordinances?nodeId=TIT17ENCO_CH17.06WACOLAOR" data-chunk-id="TIT17ENCO_CH17.06WACOLAOR" class="section-link" data-product-id="16328"><span class="popoverPositioner"></span> Chapter 17.06</a>
//                               </td>
//                         </tr>
//                      </tbody>
//                   </table>
//                </div>
//     </div>
    

//   );
// }

// export default Tables;




